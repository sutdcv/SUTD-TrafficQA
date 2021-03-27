# SUTD-TrafficQA

A Video Question Answering Benchmark

![](imgs/featured.png)

## Paper

Our paper at **CVPR 2021**, _SUTD-TrafficQA: A Question Answering Benchmark and an Efficient Network for Video Reasoning over Traffic Events_, is available at:

-   [CVF Open Access]() (coming soon)
-   [arXiv]() (coming soon)

## Dataset

#### Annotations

-   Download Coming soon.

Our annotation file is in JSON Line (`.jsonl`) format, where each line is JSON list.

| Idx (Key) |    Header    | Type  |                         Description                         |
| :-------: | :----------: | :---: | :---------------------------------------------------------: |
|    `0`    |  record_id   | `int` |                Unique ID of this data point                 |
|    `1`    |    vid_id    | `int` |                Unique ID of the source video                |
|    `2`    | vid_filename | `str` |                File name of the source video                |
|    `3`    | perspective  | `int` | `1` or `3` denotes first-person or third-person perspective |
|    `4`    |    q_body    | `str` |                          Question                           |
|    `5`    |    q_type    | `str` |                        Question Type                        |
|    `6`    |   option0    | `str` |                     Option (index zero)                     |
|    `7`    |   option1    | `str` |                     Option (index one)                      |
|    `8`    |   option2    | `str` |                     Option (index two)                      |
|    `9`    |   option3    | `str` |                    Option (index three)                     |
|   `10`    |    answer    | `int` |      The index (`0`/`1`/`2`/`3`) of the correct answer      |

#### Video Features

-   Coming soon.

#### Videos

-   To download the raw videos, you need to provide relevant information and sign an agreement with us.
-   Application form coming soon.

## Citation

-   Coming soon.

## Acknowledgment

-   Contributors:
    -   [**Lin Yutian**](https://github.com/Lynn-020809)
    -   [**Liu Renhang**](https://github.com/Samillynn)
    -   [**Tran Nguyen Bao Long**](https://github.com/TNBL265)
    -   [**Qiao Yingjie**](https://github.com/YingjieQiao)
    -   [**Huang He**](https://github.com/MarkHershey)
    -   [**Xu Li**](https://github.com/xuliwalker)
    -   **Xun Long Ng**
    -   **Koh Kai Ting**
    -   **Christabel Dorothy**
-   This work is supported by SUTD Projects `PIE-SGP-Al2020-02` and `SRG-ISTD-2020-153`.

## Contact

-   `li_xu [at] mymail.sutd.edu.sg`
