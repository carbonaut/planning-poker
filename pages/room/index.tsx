import { NextPage } from "next";
import { useState } from "react";
import Estimation from "../../components/Estimation/estimation";
import styles from "../../styles/Room.module.scss";

import Router from "next/router";

const Room: NextPage = () => {
  const [quantity, setQuantity] = useState(3);
  const [scrumMaster, setScrumMaster] = useState(true);

  const createRoom = (): void => {
    Router.push(`/`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <i className="bi bi-people-fill"></i>
        {quantity}
      </div>
      <div className={styles.content}>
        <Estimation isScrumMaster={scrumMaster} roomId=""></Estimation>
      </div>

      <footer className={styles.footer}>
        <a className={styles.action} onClick={createRoom}>
          Criar uma sala
        </a>
      </footer>
    </div>
  );
};

export default Room;
