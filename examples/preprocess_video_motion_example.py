# Acknoledgement: this code is largely referenced from @thaolmk54 under Apache License 2.0
# Ref: https://github.com/thaolmk54/hcrn-videoqa/blob/master/preprocess/preprocess_features.py


import argparse
import os
import random
from collections import OrderedDict

import h5py
import jsonlines
import numpy as np
import pandas as pd
import skvideo.io
import torch
from PIL import Image

# https://github.com/thaolmk54/hcrn-videoqa/blob/master/preprocess/models/resnext.py
from .models import resnext


def build_resnext():
    model = resnext.resnet101(
        num_classes=400,
        shortcut_type="B",
        cardinality=32,
        sample_size=112,
        sample_duration=16,
        last_fc=False,
    )
    model = model.cuda()
    assert os.path.exists("pretrained/resnext-101-kinetics.pth")
    model_data = torch.load("pretrained/resnext-101-kinetics.pth", map_location="cpu")
    # create new OrderedDict that does not contain `module.`
    new_state_dict = OrderedDict()
    for k, v in model_data["state_dict"].items():
        if "module" in k:
            name = k[7:]  # remove `module.`
            new_state_dict[name] = v
    # load params
    model.load_state_dict(new_state_dict)
    model.eval()
    return model


def run_batch(cur_batch, model):
    """
    Args:
        cur_batch: treat a video as a batch of images
        model: ResNet model for feature extraction
    Returns:
        ResNet extracted feature.
    """
    mean = np.array([0.485, 0.456, 0.406]).reshape(1, 3, 1, 1)
    std = np.array([0.229, 0.224, 0.224]).reshape(1, 3, 1, 1)

    cur_batch = (cur_batch / 255.0 - mean) / std
    image_batch = np.stack(cur_batch, axis=0).astype(np.float32)
    image_batch = torch.FloatTensor(image_batch)
    with torch.no_grad():
        image_batch = torch.autograd.Variable(image_batch).cuda()

    feats = model(image_batch)
    feats = feats.detach().cpu().numpy()

    return feats


def extract_clips_with_consecutive_frames(path, num_clips=8, num_frames_per_clip=16):
    """
    Args:
        path: path of a video
        num_clips: expected numbers of splitted clips
        num_frames_per_clip: number of frames in a single clip, pretrained model only supports 16 frames
    Returns:
        A list of raw features of clips.
    """
    valid = True
    clips = list()
    try:
        video_data = skvideo.io.vread(path)
    except:
        print("file {} error".format(path))
        valid = False
        return (
            list(np.zeros(shape=(num_clips, 3, num_frames_per_clip, 112, 112))),
            valid,
        )
    total_frames = video_data.shape[0]
    img_size = (112, 112)
    for i in np.linspace(0, total_frames, num_clips + 2, dtype=np.int32)[
        1 : num_clips + 1
    ]:
        clip_start = int(i) - int(num_frames_per_clip / 2)
        clip_end = int(i) + int(num_frames_per_clip / 2)
        if clip_start < 0:
            clip_start = 0
        if clip_end > total_frames:
            clip_end = total_frames - 1
        clip = video_data[clip_start:clip_end]
        if clip_start == 0:
            shortage = num_frames_per_clip - (clip_end - clip_start)
            added_frames = []
            for _ in range(shortage):
                added_frames.append(np.expand_dims(video_data[clip_start], axis=0))
            if len(added_frames) > 0:
                added_frames = np.concatenate(added_frames, axis=0)
                clip = np.concatenate((added_frames, clip), axis=0)
        if clip_end == (total_frames - 1):
            shortage = num_frames_per_clip - (clip_end - clip_start)
            added_frames = []
            for _ in range(shortage):
                added_frames.append(np.expand_dims(video_data[clip_end], axis=0))
            if len(added_frames) > 0:
                added_frames = np.concatenate(added_frames, axis=0)
                clip = np.concatenate((clip, added_frames), axis=0)
        new_clip = []
        for j in range(num_frames_per_clip):
            frame_data = clip[j]
            img = Image.fromarray(frame_data).resize(size=img_size)
            frame_data = np.asarray(img)
            frame_data = np.transpose(frame_data, (2, 0, 1))
            new_clip.append(frame_data)
        new_clip = np.asarray(new_clip)
        new_clip = np.transpose(new_clip, axes=(1, 0, 2, 3))
        clips.append(new_clip)
    return clips, valid


def load_video_path(args):
    """Load a list of (path,video_id tuples)."""
    input_paths = []

    # load jsonl file
    item_list = []
    first = True
    with open(args.video_file, "r") as f:
        for item in jsonlines.Reader(f):
            if first:
                cols = item
                first = False
            else:
                item_list.append(item)
    csv_data = pd.DataFrame(item_list, columns=cols)

    video_names = list(csv_data["vid_filename"])
    video_ids = list(csv_data["vid_id"])

    for idx, video in enumerate(video_names):
        video_abs_path = os.path.join(args.video_dir, video)
        input_paths.append((video_abs_path, video_ids[idx]))
    input_paths = list(set(input_paths))

    return input_paths


def generate_h5(model_resnext101, video_ids, outfile):
    """
    Args:
        model_resnext101: loaded pretrained model(resnext_101) for motion feature extraction
        video_ids: list of video ids
        outfile: path of output file to be written
    Returns:
        h5 file containing visual features of videos.
    """

    video_total_num = len(video_ids)
    with h5py.File(outfile, "w") as fd:
        feat_dset_resnext101 = None
        video_ids_dset = None
        i0 = 0
        for i, (video_path, video_id) in enumerate(video_ids):
            clips, valid = extract_clips_with_consecutive_frames(video_path)
            clip_torch = torch.FloatTensor(np.asarray(clips)).cuda()
            if valid:
                clip_feat_resnext101 = model_resnext101(clip_torch)  # (8, 2048)
                clip_feat_resnext101 = clip_feat_resnext101.squeeze()
                clip_feat_resnext101 = clip_feat_resnext101.detach().cpu().numpy()
            else:
                clip_feat_resnext101 = np.zeros(shape=(8, 2048))

            F = clip_feat_resnext101.shape[0]  # (num_clips)
            D_101 = clip_feat_resnext101.shape[1]

            if feat_dset_resnext101 is None:
                feat_dset_resnext101 = fd.create_dataset(
                    "resnext101_features", (video_total_num, F, D_101), dtype=np.float32
                )
                video_ids_dset = fd.create_dataset(
                    "ids", shape=(video_total_num,), dtype=np.int
                )

            i1 = i0 + 1
            feat_dset_resnext101[i0] = clip_feat_resnext101
            video_ids_dset[i0] = video_id
            i0 = i1


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--gpu_id",
        type=int,
        default=1,
        help="specify which gpu will be used",
    )
    parser.add_argument(
        "--out",
        dest="outfile",
        help="output filepath",
        default="motion_feat.h5",
        type=str,
    )
    parser.add_argument("--video_dir", help="raw video path", type=str)
    parser.add_argument("--label_file", type=str)
    parser.add_argument("--seed", default="666", type=int, help="random seed")
    args = parser.parse_args()

    torch.cuda.set_device(args.gpu_id)
    torch.manual_seed(args.seed)
    np.random.seed(args.seed)

    video_paths = load_video_path(args)
    random.shuffle(video_paths)

    model_resnext101 = build_resnext()

    generate_h5(model_resnext101, video_paths, args.outfile)
