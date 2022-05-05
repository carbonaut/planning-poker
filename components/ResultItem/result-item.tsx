import styles from "./result-item.module.scss";

interface ResultItemProps {
  labelVotes: string;
  labelItem: string;
  selected?: boolean;
  progress: number;
  color: string;
}

const ResultItem = (props: ResultItemProps) => {
  return (
    <div className={styles.item}>
      <div className={styles.text}>{props.labelItem}</div>
      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{ width: `${props.progress}%`, backgroundColor: props.color }}
        >
          <div className={styles.label}>{props.labelVotes}</div>
        </div>
      </div>
    </div>
  );
};

export default ResultItem;
