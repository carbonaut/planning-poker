import styles from "./estimation.module.scss";
import RadioOptions from "../RadioOptions/radiooptions";
import { useEffect, useState } from "react";
import Countdown from "../Countdown/countdown";
import LoadingRoom from "../LoadingRoom/loadingRoom";
import Results from "../Results/results";
import { io } from "socket.io-client";
export interface RoomProps {
  vote?: any;
  isScrumMaster: boolean;
  roomId: any;
  onStart: () => any;
  votes: any;
  running: boolean;
}

const Estimation = (props: RoomProps) => {
  const duration = 5;
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [running, setRunning] = useState(true);
  const [vote, setVote] = useState(null);

  // voted
  const votes = [
    { label: "13", count: 1, color: "#15C874", voted: vote === "13" },
    { label: "8", count: 2, color: "#FBB751", voted: vote === "8" },
    { label: "5", count: 1, color: "#00C6ED", voted: vote === "5" },
  ];

  let timer: any;

  useEffect(() => {
    if (props.running !== undefined) {
      setLoading(!props.running);
      timer = setInterval(() => {
        tick();
      }, 1000);
    }
  }, [props.running]);

  const socketInitializer = async () => {
    /*  socket.on("finished", () => {
      clearInterval(timer);
      setRunning(false);
    }); */
  };

  const start = async () => {
    /*     socket.emit("start"); */
    await props.onStart();
    setLoading(false);

    timer = setInterval(() => {
      tick();
    }, 1000);
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev === 1) {
        end();
      }
      return prev > 0 ? prev - 1 : 0;
    });
  };

  const end = () => {
    /*  socket.emit("finish"); */
    clearInterval(timer);
    setRunning(false);
  };

  const voteFor = (e: any) => {
    setVote(e.target.value);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingRoom
          isScrumMaster={props.isScrumMaster}
          roomNumber={props.roomId}
          onStart={start}
        ></LoadingRoom>
      ) : (
        <>
          {running ? (
            <>
              <p className={styles.title}>Estimativa de tarefa</p>
              <p className={styles.description}>
                Quantas horas você acha que esta tarefa levará?
              </p>
              <RadioOptions onChange={voteFor}></RadioOptions>
              <div className={styles.countdown}>
                <Countdown
                  duration={duration}
                  secondsLeft={secondsLeft}
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
