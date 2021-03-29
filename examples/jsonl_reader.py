import logging

# $ pip install jsonlines
import jsonlines


def read_annotation_sample():
    record_count = -1
    error = 0

    with jsonlines.open("annotation_sample.jsonl") as reader:
        for datapoint in reader:
            record_count += 1

            if record_count == 0:
                # skip header
                continue

            try:
                record_id: int = datapoint[0]
                vid_id: int = datapoint[1]
                vid_filename: str = datapoint[2]
                perspective: int = datapoint[3]
                q_body: str = datapoint[4]
                q_type: str = datapoint[5]
                option_0: str = datapoint[6]
                option_1: str = datapoint[7]
                option_2: str = datapoint[8]
                option_3: str = datapoint[9]
                answer_idx: int = datapoint[10]

                options = [option_0, option_1, option_2, option_3]
                answer_str = options[answer_idx]

                print(f"Q: {q_body}\nA: {answer_str}\n")

            except Exception as e:
                logging.warning(e)
                error += 1
                record_count -= 1
                continue

    if error:
        logging.warning(f"Encountered {error} errors while reading.")


if __name__ == "__main__":
    read_annotation_sample()
