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
}

const Estimation = (props: RoomProps) => {
  const duration = 5;
  const [loading, setLoading] = useState(true);
  const [vote, setVote] = useState(null);

  // voted
  const votes = [
    { label: "13", count: 1, color: "#15C874", voted: vote === "13" },
    { label: "8", count: 2, color: "#FBB751", voted: vote === "8" },
    { label: "5", count: 1, color: "#00C6ED", voted: vote === "5" },
  ];

  let timer: any;

  useEffect(() => {
    if (props.waiting !== undefined) {
      setLoading(props.waiting);
    }
  }, [props.waiting]);

  const start = async () => {
    await props.onStart();
  };

  const voteFor = (e: any) => {
    setVote(e.target.value);
    props.onVote(e.target.value);
  };

  return (
    <div className={styles.container}>
      {!loading && !props.running ? (
        <Button onClick={props.onStart}>Restart</Button>
      ) : (
        <></>
      )}
      {loading ? (
        <LoadingRoom
          isScrumMaster={props.isScrumMaster}
          roomNumber={props.roomId}
          onStart={start}
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
              <Results votes={props.votes}></Results>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Estimation;
