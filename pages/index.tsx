import type { NextPage } from "next";
import Router from "next/router";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";

import { useState } from "react";
import Button from "../components/Button/button";

const Home: NextPage = () => {
  const randomString = (): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const createRoom = (): void => {
    let roomId = randomString();
    Router.push(`/room/${roomId}?host=true`);
  };

  const visitRoom = (roomId: string): void => {
    Router.push(`/room/${roomId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Login onVisitRoom={visitRoom}></Login>
      </div>

      <footer className={styles.footer}>
        <Button type="secondary" onClick={createRoom}>
          Criar Sala
        </Button>
      </footer>
    </div>
  );
};

export default Home;
