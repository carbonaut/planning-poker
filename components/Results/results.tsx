import ResultItem from "../ResultItem/result-item";

import styles from "./results.module.scss";

/**
 * votes.label -> Estimation number (1,2,3,5...)
 * votes.count -> Number of votes for that estimation
 * votes.color -> Background color for that estimation
 */
interface ResultsProps {
  votes: { label: string; count: number; color: string; voted: boolean }[];
}

const Results = (props: ResultsProps) => {
  const totalVotes = props.votes.reduce(
    (currentValue, el) => currentValue + el.count,
    0
  );
  console.log(totalVotes);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados</h2>
      <div className={styles.content}>
        {props.votes.map((el, index) => {
          const progress = (el.count / totalVotes) * 100;
          const labelVoto = el.count === 1 ? "voto" : "votos";
          return (
            <ResultItem
              key={index}
              labelVotes={`${el.count} ${labelVoto}`}
              color={el.color}
              labelItem={el.label}
              progress={progress}
              voted={el.voted}
            ></ResultItem>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
