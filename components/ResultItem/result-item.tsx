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
  function getBgColor() {
    if (props.winner) {
      return "var(--color-green)";
    } else if (props.status === 1) {
      return "var(--color-red)";
    } else {
      return "var(--color-disabled)";
    }
  }

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
            backgroundColor: getBgColor(),
          }}
        >
          <div className={styles.label}>{props.labelVotes}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
