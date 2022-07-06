import styles from "./estimation.module.scss";
import RadioOptions from "../RadioOptions/radiooptions";
import { useEffect, useState } from "react";
import Countdown from "../Countdown/countdown";
import LoadingRoom from "../LoadingRoom/loadingRoom";
import Results from "../Results/results";
import { io } from "socket.io-client";
import Button from "../Button/button";
export interface RoomProps {
  vote?: any;
  isScrumMaster: boolean;
  roomId: any;
  onStart: () => any;
  onVote: (value: number) => any;
  votes: any;
  waiting: boolean;
  running: boolean;
  secondsLeft: number;
  duration: number;
  ended: boolean;
  noDevs: number;
}

const Estimation = (props: RoomProps) => {
  const [loading, setLoading] = useState(true);
  const [vote, setVote] = useState(null);

  useEffect(() => {
    if (props.waiting !== undefined) {
      setLoading(props.waiting);
    }
  }, [props.waiting]);

  useEffect(() => {
    if (props.running) {
      setVote(null);
    }
  }, [props.running]);

  const start = async () => {
    await props.onStart();
  };

  const voteFor = (e: any) => {
    setVote(e.target.value);
    props.onVote(e.target.value);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingRoom
          isScrumMaster={props.isScrumMaster}
          roomNumber={props.roomId}
          onStart={start}
          disabled={props.noDevs > 1}
        ></LoadingRoom>
      ) : (
        <>
          {props.running ? (
            <>
              <p className={styles.title}>Estimativa de tarefa</p>
              <p className={styles.description}>
                Quantas horas você acha que esta tarefa levará?
              </p>
              <RadioOptions onChange={voteFor}></RadioOptions>
              <div className={styles.countdown}>
                <Countdown
                  duration={props.duration}
                  secondsLeft={props.secondsLeft}
                ></Countdown>
              </div>
            </>
          ) : (
            <div>
              <Results
                votes={props.votes}
                vote={vote}
                ended={props.ended}
              ></Results>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Estimation;
