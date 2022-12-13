# Acknowledgement: this code is largely referenced from @thaolmk54 under Apache License 2.0
# Ref: https://github.com/thaolmk54/hcrn-videoqa/blob/master/preprocess/preprocess_features.py

import argparse
import os
import random

import h5py
import jsonlines
import numpy as np
import pandas as pd
import skvideo.io
import torch
from PIL import Image


def build_mobilenetv2():
    cnn = torch.hub.load("pytorch/vision", "mobilenet_v2", pretrained=True)
    model = torch.nn.Sequential(*list(cnn.children())[:-1])
    model.cuda()
    model.eval()
    return model


def build_resnet101():
    cnn = getattr(torchvision.models, "resnet101")(pretrained=True)
    model = torch.nn.Sequential(*list(cnn.children())[:-1])
    model.cuda()
    model.eval()
    return model


def build_resnet18():
    cnn = getattr(torchvision.models, "resnet18")(pretrained=True)
    model = torch.nn.Sequential(*list(cnn.children())[:-1])
    model.cuda()
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
            list(np.zeros(shape=(num_clips, num_frames_per_clip, 3, 224, 224))),
            valid,
        )
    total_frames = video_data.shape[0]
    img_size = (224, 224)

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
        clips.append(new_clip)

    return clips, valid


def load_video_path(args):
    """Load a list of (path,video_id tuples)."""
    input_paths = []

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


def generate_h5(model_res101, model_res18, model_mobilev2, video_ids, outfile):
    """
    Args:
        model_res101: loaded pretrained model(resnet_101) for heavy feature extraction
        model_res18 : loaded pretrained model(resnet_18) for light feature extraction
        model_mobilev2 : loaded pretrained model(mobilenet_v2) for light feature extraction
        video_ids: list of video ids
        outfile: path of output file to be written
    Returns:
        h5 file containing visual features of videos.
    """

    video_total_num = len(video_ids)
    print("total_num: ", video_total_num)

    with h5py.File(outfile, "w") as fd:
        feat_dset_res101, feat_dset_res18 = None, None
        video_ids_dset = None
        i0 = 0

        for i, (video_path, video_id) in enumerate(video_ids):
            clips, valid = extract_clips_with_consecutive_frames(video_path)
            clip_feat_res101, clip_feat_res18, clip_feat_mobile = [], [], []

            if valid:
                for clip_id, clip in enumerate(clips):
                    feats_res101 = run_batch(clip, model_res101).squeeze()  # (16, 2048)
                    feats_res18 = run_batch(clip, model_res18).squeeze()  # (16, 512)
                    feats_mobile = np.mean(
                        run_batch(clip, model_mobilev2),
                        axis=(2, 3),
                    ).squeeze()  # (16,1280)
                    clip_feat_res101.append(feats_res101)
                    clip_feat_res18.append(feats_res18)
                    clip_feat_mobile.append(feats_mobile)
            else:
                clip_feat_res101 = [np.zeros(shape=(16, 2048))] * 8
                clip_feat_res18 = [np.zeros(shape=(16, 512))] * 8
                clip_feat_mobile = [np.zeros(shape=(16, 1280))] * 8

            video_feat_res101 = np.concatenate(clip_feat_res101, axis=0)  # (128, 2048)
            video_feat_res18 = np.concatenate(clip_feat_res18, axis=0)  # (128, 512)
            video_feat_mobile = np.concatenate(clip_feat_mobile, axis=0)  # (128, 1280)

            F = video_feat_res101.shape[0]
            D_101 = video_feat_res101.shape[1]
            D_18 = video_feat_res18.shape[1]
            D_mobile = video_feat_mobile.shape[1]

            if feat_dset_res101 is None:

                feat_dset_res101 = fd.create_dataset(
                    "resnet101_features",
                    (video_total_num, F, D_101),
                    dtype=np.float32,
                )
                feat_dset_res18 = fd.create_dataset(
                    "resnet18_features",
                    (video_total_num, F, D_18),
                    dtype=np.float32,
                )
                feat_dset_mobile = fd.create_dataset(
                    "mobilenetv2_features",
                    (video_total_num, F, D_mobile),
                    dtype=np.float32,
                )
                video_ids_dset = fd.create_dataset(
                    "video_ids",
                    shape=(video_total_num,),
                    dtype=np.int,
                )

            i1 = i0 + 1
            feat_dset_res101[i0] = video_feat_res101
            feat_dset_res18[i0] = video_feat_res18
            feat_dset_mobile[i0] = video_feat_mobile
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
        default="appearance_feat.h5",
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

    import torchvision

    model_mobilenetv2 = build_mobilenetv2()
    model_resnet101 = build_resnet101()
    model_resnet18 = build_resnet18()

    generate_h5(
        model_resnet101,
        model_resnet18,
        model_mobilenetv2,
        video_paths,
        args.outfile,
    )
