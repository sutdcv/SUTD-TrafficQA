# Acknoledgement: this code is largely referenced from @thaolmk54 under Apache License 2.0
# Ref: https://github.com/thaolmk54/hcrn-videoqa/blob/master/DataLoader.py


import json
import math
import pickle

import h5py
import numpy as np
import torch
from torch.utils.data import DataLoader, Dataset


def invert_dict(d):
    return {v: k for k, v in d.items()}


def load_vocab(path: str):
    with open(path, "r") as f:
        vocab = json.load(f)
        vocab["question_idx_to_token"] = invert_dict(vocab["question_token_to_idx"])
        vocab["answer_idx_to_token"] = invert_dict(vocab["answer_token_to_idx"])
        vocab["question_answer_idx_to_token"] = invert_dict(
            vocab["question_answer_token_to_idx"]
        )
    return vocab


class VideoQADataset(Dataset):
    def __init__(
        self,
        answers,
        ans_candidates,
        ans_candidates_len,
        questions,
        questions_len,
        video_ids,
        q_ids,
        app_feature_h5,
        app_feat_id_to_index,
        motion_feature_h5,
        motion_feat_id_to_index,
    ):
        # convert data to tensor
        self.all_answers = answers
        self.all_questions = torch.LongTensor(np.asarray(questions))
        self.all_questions_len = torch.LongTensor(np.asarray(questions_len))
        self.all_video_ids = torch.LongTensor(np.asarray(video_ids))
        self.all_q_ids = q_ids
        self.app_feature_h5 = app_feature_h5
        self.motion_feature_h5 = motion_feature_h5
        self.app_feat_id_to_index = app_feat_id_to_index
        self.motion_feat_id_to_index = motion_feat_id_to_index
        self.all_ans_candidates = torch.LongTensor(np.asarray(ans_candidates))
        self.all_ans_candidates_len = torch.LongTensor(np.asarray(ans_candidates_len))

    def __getitem__(self, index):
        answer = self.all_answers[index]
        ans_candidates = self.all_ans_candidates[index]
        ans_candidates_len = self.all_ans_candidates_len[index]
        question = self.all_questions[index]
        question_len = self.all_questions_len[index]
        video_idx = self.all_video_ids[index].item()
        question_idx = self.all_q_ids[index]
        app_index = self.app_feat_id_to_index[str(video_idx)]
        motion_index = self.motion_feat_id_to_index[str(video_idx)]

        with h5py.File(self.app_feature_h5, "r") as f_app:
            appearance_feat = f_app["resnet101_features"][app_index]  # (128, 2048)

        with h5py.File(self.motion_feature_h5, "r") as f_motion:
            motion_feat = f_motion["resnext101_features"][motion_index]  # (8, 2048)

        appearance_feat = torch.from_numpy(appearance_feat)
        motion_feat = torch.from_numpy(motion_feat)

        return (
            video_idx,
            question_idx,
            answer,
            ans_candidates,
            ans_candidates_len,
            appearance_feat,
            motion_feat,
            question,
            question_len,
        )

    def __len__(self):
        return len(self.all_questions)


class VideoQADataLoader(DataLoader):
    def __init__(self, **kwargs):
        vocab_json_path: str = str(kwargs.pop("vocab_json"))
        print(f"Loading vocab from {vocab_json_path}")
        vocab = load_vocab(vocab_json_path)

        question_pt_path = str(kwargs.pop("question_pt"))
        print(f"Loading questions from {question_pt_path}")

        with open(question_pt_path, "rb") as f:
            obj = pickle.load(f)
            questions = obj["questions"]
            questions_len = obj["questions_len"]
            video_ids = obj["video_ids"]
            q_ids = obj["question_id"]
            answers = obj["answers"]
            glove_matrix = obj["glove"]
            ans_candidates = obj["ans_candidates"]
            ans_candidates_len = obj["ans_candidates_len"]

        print(f"Loading appearance feature from {kwargs['appearance_feat']}")
        with h5py.File(kwargs["appearance_feat"], "r") as app_features_file:
            app_video_ids = app_features_file["ids"][()]

        app_feat_id_to_index = {str(_id): i for i, _id in enumerate(app_video_ids)}
        print(f"Loading motion feature from {kwargs['motion_feat']}")

        with h5py.File(kwargs["motion_feat"], "r") as motion_features_file:
            motion_video_ids = motion_features_file["ids"][()]

        motion_feat_id_to_index = {
            str(_id): i for i, _id in enumerate(motion_video_ids)
        }

        self.app_feature_h5 = kwargs.pop("appearance_feat")
        self.motion_feature_h5 = kwargs.pop("motion_feat")
        self.dataset = VideoQADataset(
            answers,
            ans_candidates,
            ans_candidates_len,
            questions,
            questions_len,
            video_ids,
            q_ids,
            self.app_feature_h5,
            app_feat_id_to_index,
            self.motion_feature_h5,
            motion_feat_id_to_index,
        )

        self.vocab = vocab
        self.batch_size = kwargs["batch_size"]
        self.glove_matrix = glove_matrix

        super().__init__(self.dataset, **kwargs)

    def __len__(self):
        return math.ceil(len(self.dataset) / self.batch_size)
