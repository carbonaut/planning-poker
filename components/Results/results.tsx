import { useEffect, useState } from "react";
import ResultItem from "../ResultItem/result-item";
import ResultsMessage from "../ResultsMessage/results-message";

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
    if (normalized.length === 0 || !props.ended) {
      setResult(0);
      return;
    }

    if (normalized.length === 1) {
      setWinner(normalized[0].label);
      setResult(3);
      return;
    }

    let votesSum = 0;

    normalized.forEach((i) => {
      votesSum += i.count;
    });

    if (votesSum === normalized[0].count * normalized.length) {
      setWinner(null);
      setResult(1);
      return;
    } else {
      let mostVotedIndex = -1;
      normalized.forEach((vote, i) => {
        if (
          mostVotedIndex < 0 ||
          vote.count > normalized[mostVotedIndex].count
        ) {
          mostVotedIndex = i;
        }
      });

      setWinner(normalized[mostVotedIndex].label);
      setResult(2);
      return;
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
    <div
      className={`l-container l-container--inner ${styles.container} ${
        result === 3 ? styles.neon : ""
      }`}
    >
      {(props.vote || props.votes) && (
        <>
          <h2 className={styles.title}>Resultados</h2>
          <div className={styles.content}>
            {normalized.map((el: VoteItem, index) => {
              const progress = (el.count / totalVotes) * 100;
              const labelVoto = el.count === 1 ? "voto" : "votos";
              return (
                <ResultItem
                  key={index}
                  labelVotes={`${el.count} ${labelVoto}`}
                  winner={winner === el.label}
                  labelItem={el.label}
                  progress={progress}
                  voted={props.vote?.toString() == el.label}
                  status={result}
                ></ResultItem>
              );
            })}
          </div>

          {props.vote && result < 1 && (
            <div className={styles.emptyMessage}></div>
          )}
          {result > 0 && (
            <div className={styles.result}>
              <ResultsMessage status={result} />
            </div>
          )}
        </>
      )}

      {!props.vote && result === 0 && (
        <div className={styles.empty}>
          <img src="/stars.svg" />
          <p className={styles.emptyText}>
            Não há nada além de um grande vazio
          </p>
          <p className={styles.emptyText}>Esqueceram de votar?</p>
        </div>
      )}
    </div>
  );
};

export default Results;
