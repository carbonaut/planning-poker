import styles from "./result-item.module.scss";

interface ResultItemProps {
  labelVotes: string;
  labelItem: string;
  selected?: boolean;
  progress: number;
  color: string;
  voted: boolean;
}

const ResultItem = (props: ResultItemProps) => {
  return (
    <div className={styles.item}>
      {props.voted && <div className={styles.voted}><i className="bi bi-arrow-right"></i></div>}
      <div className={styles.text}>{props.labelItem}</div>
      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{ width: `calc(${props.progress}% - 4px)`, backgroundColor: props.color }}
        >
          <div className={styles.label}>{props.labelVotes}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
