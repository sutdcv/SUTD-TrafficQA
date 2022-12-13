import json


def main():
    with open("annotation_sample.jsonl") as f:
        lines = f.readlines()

    _header = lines.pop(0)

    Q_TYPE_MAP = {
        "U": "Basic Understanding",
        "A": "Attribution",
        "F": "Event Forecasting",
        "R": "Reverse Reasoning",
        "C": "Counterfactual Inference",
        "I": "Introspection",
    }

    for line in lines:
        data: list = json.loads(line.strip())

        record_id: int = data[0]
        vid_id: int = data[1]
        vid_filename: str = data[2]
        q_body: str = data[4]
        q_type: str = data[5]
        options: list = data[6:10]
        answer_idx: int = data[10]
        answer_str: str = options[answer_idx]

        q_type = Q_TYPE_MAP.get(q_type, "Unknown")

        print(
            f"record_id: {record_id} | vid_id: {vid_id} | filename: {vid_filename}\nq_type: {q_type}\nQ: {q_body}\nA: {answer_str}\n"
        )


if __name__ == "__main__":
    main()
