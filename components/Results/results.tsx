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

interface VotemItemColored extends VoteItem {
  color: string;
}

type VoteItem = {
  label: string;
  count: number;
  color: string;
};

const Results = (props: ResultsProps) => {
  const [result, setResult] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [normalized, setNormalized] = useState<VotemItemColored[]>([]);

  useEffect(() => {
    getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.votes]);

  useEffect(() => {
    if (normalized.length === 0 || !props.ended) return;

    setWinner(null);

    if (normalized.length === 1) {
      setWinner(normalized[0].label);
      return setResult(3);
    }

    let count = 0;

    normalized.forEach((item: VoteItem) => {
      count += item.count;
    });

    if (normalized.length === 2) {
      // check if both elements are immediate to one another
      const votesArray = Object.keys(props.votes);
      const winnerIndex = votesArray.findIndex(
        (el) => el === normalized[1].label
      );

      if (votesArray[winnerIndex - 1] === normalized[0].label) {
        setWinner(normalized[1].label);
        return setResult(2);
      }

      return setResult(1);
    } else if (
      normalized.length > 0 &&
      count === normalized[0].count * normalized.length
    ) {
      return setResult(1);
    }
  }, [props.ended, normalized]);

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

    setTotalVotes(
      withCount.reduce(
        (currentValue: number, el: any) => currentValue + el.count,
        0
      )
    );
  };

  return (
    <div className={`l-container ${styles.container}`}>
      <h2 className={styles.title}>Resultados</h2>
      <div className={styles.content}>
        {normalized.map((el: VoteItem, index) => {
          const progress = (el.count / totalVotes) * 100;
          const labelVoto = el.count === 1 ? "voto" : "votos";
          return (
            <ResultItem
              key={index}
              labelVotes={`${el.count} ${labelVoto}`}
              color={winner === el.label ? "#15C874" : "#2D3336"}
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
          <span>Vocês que lutem</span>
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
