import { useEffect, useState } from "react";
import ResultItem from "../ResultItem/result-item";

import styles from "./results.module.scss";

/**
 * votes.label -> Estimation number (1,2,3,5...)
 * votes.count -> Number of votes for that estimation
 * votes.color -> Background color for that estimation
 */
interface ResultsProps {
  votes: {
    [key: number]: VoteItem;
  };
  vote: number | null;
  ended: boolean;
}

type VoteItem = {
  label: string;
  count: number;
  color: string;
};

const Results = (props: ResultsProps) => {
  const [result, setResult] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [normalized, setNormalized] = useState([]);

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.votes]);

  useEffect(() => {
    if (normalized.length === 0) return;
    if (normalized.length === 1) {
      // consenso
      return setResult(3);
    }

    let count = 0;

    normalized.forEach((item: VoteItem) => {
      count += item.count;
    });

    if (
      normalized.length > 0 &&
      count === normalized[0].count * normalized.length
    ) {
      // empate
      setResult(1);
    } else {
      // resultado
      setResult(2);
    }
  }, [props.ended]);

  const getResults = () => {
    // convert the results from hashmap to array
    // removing elements with no votes
    if (!props.votes) {
      return;
    }

    const withCount: any = Object.keys(props.votes)
      .filter((el: any) => props.votes[el].count > 0)
      .map((el: any) => props.votes[el]);

    setNormalized(withCount);

    console.log(withCount);

    // set the total number of votes
    setTotalVotes(
      withCount.reduce(
        (currentValue: number, el: any) => currentValue + el.count,
        0
      )
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados</h2>
      <div className={styles.content}>
        {normalized.map((el: VoteItem, index) => {
          const progress = (el.count / totalVotes) * 100;
          const labelVoto = el.count === 1 ? "voto" : "votos";
          return (
            <ResultItem
              key={index}
              labelVotes={`${el.count} ${labelVoto}`}
              color={el.color}
              labelItem={el.label}
              progress={progress}
              voted={props.vote?.toString() == el.label}
            ></ResultItem>
          );
        })}
      </div>

      {result === 1 && (
        <div className={styles.result}>
          <i
            className={`bi bi-exclamation-circle-fill ${styles.icon} ${styles.red}`}
          ></i>
          <span>
            Que pena, empatou <i className="bi bi-emoji-frown"></i>
          </span>
        </div>
      )}

      {result === 2 && (
        <div className={styles.result}>
          <i
            className={`bi bi-check-circle-fill ${styles.icon} ${styles.yellow}`}
          ></i>
          <span>Temos um resultado</span>
        </div>
      )}

      {result === 3 && (
        <div className={styles.result}>
          <i
            className={`bi bi-check-circle-fill ${styles.icon} ${styles.green}`}
          ></i>
          <span>Temos consenso!</span>
        </div>
      )}
    </div>
  );
};

export default Results;
