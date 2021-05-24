import json


def main():
    with open("annotation_sample.jsonl") as f:
        lines = f.readlines()

    _header = lines.pop(0)

    for line in lines:
        data: list = json.loads(line.strip())

        record_id: int = data[0]
        vid_id: int = data[1]
        vid_filename: str = data[2]
        q_body: str = data[4]
        options: list = data[5:9]
        answer_idx: int = data[9]
        answer_str: str = options[answer_idx]

        print(
            f"record_id: {record_id} | vid_id: {vid_id} | filename: {vid_filename}\nQ: {q_body}\nA: {answer_str}\n"
        )


if __name__ == "__main__":
    main()
