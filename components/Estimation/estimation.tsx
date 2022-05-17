import styles from "./estimation.module.scss";
import RadioOptions from "../RadioOptions/radiooptions";
import { useEffect, useState } from "react";
import Countdown from "../Countdown/countdown";
import LoadingRoom from "../LoadingRoom/loadingRoom";
import Results from "../Results/results";
import { RoomProps } from "../../pages/room/[id]";
import { io } from "socket.io-client";
let socket: any;

const Estimation = (props: RoomProps) => {
  const duration = 5;
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [running, setRunning] = useState(true);
  const [vote, setVote] = useState(null);

  useEffect(
    () => () => {
      socketInitializer();
    },
    []
  );

  // voted
  const votes = [
    { label: "13", count: 1, color: "#15C874", voted: vote === "13" },
    { label: "8", count: 2, color: "#FBB751", voted: vote === "8" },
    { label: "5", count: 1, color: "#00C6ED", voted: vote === "5" },
  ];

  let timer: any;

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("started", () => {
      setLoading(false);

      timer = setInterval(() => {
        tick();
      }, 1000);
    });
  };

  const start = () => {
    socket = io();

    socket.emit("start");
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
              <Results votes={votes}></Results>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Estimation;
