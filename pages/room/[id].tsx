import { NextPage } from "next";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Estimation from "../../components/Estimation/estimation";
import styles from "../../styles/Room.module.scss";

let socket: any;
const Room: NextPage = () => {
  const { query, isReady } = useRouter();

  const { id, host } = query;

  const [noDevs, setNoDevs] = useState(0);
  const [scrumMaster, setScrumMaster] = useState(true);
  const [vote, setVote] = useState(null);

  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(5);

  let timer: any;

  // voted
  const votes = [
    { label: "13", count: 1, color: "#15C874", voted: vote === "13" },
    { label: "8", count: 2, color: "#FBB751", voted: vote === "8" },
    { label: "5", count: 1, color: "#00C6ED", voted: vote === "5" },
  ];

  useEffect(() => {
    if (!isReady) {
      return;
    }
    setScrumMaster(host ? true : false);

    socketInitializer();
  }, [isReady]);

  const socketInitializer = () => {
    socket = io("http://localhost:4200");

    socket.on("connect", () => {
      socket.emit("join", id);
    });

    socket.on("countUpdate", (data: any) => {
      setNoDevs(data.count);
    });

    socket.on("started", () => {
      setStarted(true);
      timer = setInterval(() => {
        tick();
      }, 1000);

      setRunning(true);
    });

    socket.on("finished", (data: any) => {
      console.log(data);
      clearInterval(timer);
      setRunning(false);
    });
  };

  const startEstimation = () => {
    socket.emit("start");
  };

  const start = () => {
    timer = setInterval(() => {
      tick();
    }, 1000);
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev === 1) {
        if (scrumMaster) endRound();
      }
      return prev > 0 ? prev - 1 : 0;
    });
  };

  const endRound = () => {
    socket.emit("finish");
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <i className="bi bi-people-fill"></i>
        {noDevs}
      </div>
      <div className={styles.content}>
        <Estimation
          isScrumMaster={scrumMaster}
          roomId={id}
          onStart={startEstimation}
          votes={votes}
          waiting={!started}
          running={running}
          secondsLeft={secondsLeft}
        ></Estimation>
      </div>

      {scrumMaster && (
        <footer className={styles.footer}>
          <p className={styles.action}>ID: {id}</p>
          <span className={styles.separator}></span>
          <p className={styles.action}>Encerrar sala</p>
        </footer>
      )}
    </div>
  );
};

export default Room;
