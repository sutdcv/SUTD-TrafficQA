# TrafficQA

A Video Question Answering Benchmark

![](imgs/featured.png)

## Paper

Our paper at **CVPR 2021**, _TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events_, is available at:

-   [arXiv:2103.15538](https://arxiv.org/abs/2103.15538)
-   [ResearchGate](https://www.researchgate.net/publication/350432154_TrafficQA_A_Question_Answering_Benchmark_and_an_Efficient_Network_for_Video_Reasoning_over_Traffic_Events)
<!-- -   [CVF Open Access]() -->

## Dataset

#### Annotations

Our annotation is in JSON Lines (`.jsonl`) text file format where each line is a JSON list. Each list contains the following items:

| List Idx |    Header    | Type  |                         Description                         |
| :------: | :----------: | :---: | :---------------------------------------------------------: |
|   `0`    |  record_id   | `int` |                Unique ID of this data point                 |
|   `1`    |    vid_id    | `int` |                Unique ID of the source video                |
|   `2`    | vid_filename | `str` |                File name of the source video                |
|   `3`    | perspective  | `int` | `1` or `3` denotes first-person or third-person perspective |
|   `4`    |    q_body    | `str` |                          Question                           |
|   `5`    |    q_type    | `str` |                        Question Type                        |
|   `6`    |   option0    | `str` |                     Option (index `0`)                      |
|   `7`    |   option1    | `str` |                     Option (index `1`)                      |
|   `8`    |   option2    | `str` |                     Option (index `2`)                      |
|   `9`    |   option3    | `str` |                     Option (index `3`)                      |
|   `10`   |    answer    | `int` |      The index (`0`/`1`/`2`/`3`) of the correct answer      |

-   View Sample Annotations: [examples/annotation_sample.jsonl](examples/annotation_sample.jsonl)
-   View Example Reader: [examples/jsonl_reader.py](examples/jsonl_reader.py)
-   `Download` (coming soon)

#### Video Features

-   `Download` (coming soon)

#### Videos

-   To download the raw videos, you need to provide relevant information and sign an agreement with us.
-   `Application form` (coming soon)

## Citation

```bibtex
@inproceedings{xu2021sutd,
  title={SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events},
  author={Xu, Li and Huang, He and Liu, Jun},
  booktitle={Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition},
  year={2021}
}
```

## Acknowledgment

-   Contributors:
    -   [**Lin Yutian**](https://github.com/Lynn-020809)
    -   [**Liu Renhang**](https://github.com/Samillynn)
    -   [**Tran Nguyen Bao Long**](https://github.com/TNBL265)
    -   [**Qiao Yingjie**](https://github.com/YingjieQiao)
    -   [**Huang He**](https://github.com/MarkHershey)
    -   **Xun Long Ng**
    -   **Koh Kai Ting**
    -   **Christabel Dorothy**

## Contact

-   `li_xu [at] mymail.sutd.edu.sg`
