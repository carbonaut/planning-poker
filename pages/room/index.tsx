import { NextPage } from "next";
import { useState } from "react";
import Estimation from "../../components/Estimation/estimation";
import styles from "../../styles/Room.module.scss";

import Router from "next/router";
import Button from "../../components/Button/button";

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
      <div className={styles.content}></div>

      <footer className={styles.footer}>
        <Button type="secondary" onClick={createRoom}>
          Criar Sala
        </Button>
      </footer>
    </div>
  );
};

export default Room;
