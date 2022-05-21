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
  };

  const startEstimation = () => {
    socket.emit("start");
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
