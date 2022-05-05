import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Estimation from "../../components/Estimation/estimation";
import styles from "../../styles/Room.module.scss";

export interface RoomProps {
  vote?: any;
  isScrumMaster: boolean;
}

let socket: any;
const Room: NextPage = () => {
  const router = useRouter();
  const { pid } = router.query;

  const [noDevs, setNoDevs] = useState(0);
  const [scrumMaster, setScrumMaster] = useState(true);
  const [vote, setVote] = useState(null);

  useEffect(
    () => () => {
      socketInitializer();
    },
    []
  );

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      socket.emit("join", pid);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <i className="bi bi-people-fill"></i>
        {noDevs}
      </div>
      <div className={styles.content}>
        <Estimation isScrumMaster={scrumMaster}></Estimation>
      </div>

      {scrumMaster && (
        <footer className={styles.footer}>
          <p className={styles.action}>ID: 123456</p>
          <span className={styles.separator}></span>
          <p className={styles.action}>Encerrar sala</p>
        </footer>
      )}
    </div>
  );
};

export default Room;
