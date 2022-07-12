import styles from "./result-item.module.scss";

interface ResultItemProps {
  labelVotes: string;
  labelItem: string;
  selected?: boolean;
  progress: number;
  voted: boolean;
  winner: boolean;
  status: number;
}

const ResultItem = (props: ResultItemProps) => {
  return (
    <div className={styles.item}>
      {props.voted && (
        <div className={styles.voted}>
          <i className="bi bi-arrow-right"></i>
        </div>
      )}
      <div
        className={`${styles.text} ${
          props.winner ? "u-color--green" : styles.textGray
        }`}
      >
        {props.labelItem}
      </div>
      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{
            width: `calc(${props.progress}% - 4px)`,
            backgroundColor: props.winner
              ? "var(--color-green)"
              : props.status === 1
              ? "var(--color-red)"
              : "var(--color-disabled)",
          }}
        >
          <div
            className={styles.label}
            style={{
              color: `${
                props.winner ? "var(--color-gray-900)" : "var(--color-gray-700)"
              }`,
            }}
          >
            {props.labelVotes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
