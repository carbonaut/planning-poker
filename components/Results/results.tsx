import { useEffect, useState } from "react";
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
  const [result, setResult] = useState(0);

  useEffect(() => {
    getResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.votes]);

  const totalVotes = props.votes.reduce(
    (currentValue, el) => currentValue + el.count, 0
  );

  console.log(totalVotes);

  function getResults() {
    if (props.votes.length === 1) {
      // consenso
      return setResult(3);
    }

    let count = 0;

    props.votes.forEach((item) => {
      count += item.count;
    });

    if (count === props.votes[0].count * props.votes.length) {
      // empate
      setResult(1);
    } else {
      // resultado
      setResult(2);
    }
  }

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

      {result === 1 && <div className={styles.result}>
        <i className={`bi bi-exclamation-circle-fill ${styles.icon} ${styles.red}`}></i>
          <span>Que pena, empatou <i className="bi bi-emoji-frown"></i></span>
        </div>}

      {result === 2 && <div className={styles.result}>
        <i className={`bi bi-check-circle-fill ${styles.icon} ${styles.yellow}`}></i>
          <span>Temos um resultado</span>
        </div>}

      {result === 3 && <div className={styles.result}>
        <i className={`bi bi-check-circle-fill ${styles.icon} ${styles.green}`}></i>
          <span>Temos consenso!</span>
        </div>}
    </div>
  );
};

export default Results;
