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

  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(5);

  const [votes, setVotes] = useState({
    1: { label: "1", count: 0, color: "#15C874", voted: false },
    2: { label: "2", count: 0, color: "#15C874", voted: false },
    3: { label: "3", count: 0, color: "#15C874", voted: false },
    5: { label: "5", count: 0, color: "#15C874", voted: false },
    8: { label: "8", count: 0, color: "#15C874", voted: false },
    13: { label: "13", count: 0, color: "#15C874", voted: false },
    21: { label: "21", count: 0, color: "#15C874", voted: false },
  });

  let timer: any;

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
      setResults(data.votes);
    });
  };

  const startEstimation = () => {
    socket.emit("start");
  };

  const emitVote = (value: number) => {
    socket.emit("vote", value);
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

  const setResults = (results: { [key: number]: number }) => {
    Object.keys(results).forEach((vote) => {
      const voteCpy = votes[vote];
      voteCpy.count = results[vote];
      const updatedVotes = { ...votes, ...voteCpy };
      setVotes(updatedVotes);
    });
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
          onVote={emitVote}
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
