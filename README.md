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

|     Key      | Type  |                            Description                             |
| :----------: | :---: | :----------------------------------------------------------------: |
|  record_id   | `int` |                    Unique ID of this data point                    |
|    vid_id    | `int` |                   Unique ID of the source video                    |
| vid_filename | `str` |                   File name of the source video                    |
| perspective  | `int` | Either `1` or `3` denotes first-person or third-person perspective |
|    q_body    | `str` |                              Question                              |
|    q_type    | `str` |                           Question Type                            |
|   option0    | `str` |                        Option (index zero)                         |
|   option1    | `str` |                         Option (index one)                         |
|   option2    | `str` |                         Option (index two)                         |
|   option3    | `str` |                        Option (index three)                        |
|    answer    | `int` |         The index (`0`/`1`/`2`/`3`) of the correct answer          |

#### Video Features

-   Coming soon.

#### Videos

-   To download the raw videos, you need to provide relevant information and sign an agreement with us.
-   Application form coming soon.

## Citation

-   Coming soon.

## Contact

-   `li_xu [at] mymail.sutd.edu.sg`
