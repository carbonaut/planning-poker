import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";
import io from "socket.io-client";
import { useEffect } from "react";
let socket: any;

const Home: NextPage = () => {
  useEffect(
    () => () => {
      socketInitializer();
    },
    []
  );

  const randomString = (): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("countUpdate", (data: { count: number; id: string }) => {
      Router.push(`room/${data.id}`);
    });
  };

  const createRoom = (): void => {
    let roomId = randomString();
    socket.emit("join", roomId);
    sessionStorage.setItem("isHost", "true");
  };

  const visitRoom = (roomId: string): void => {
    Router.push(`room/${roomId}`);
    sessionStorage.setItem("isHost", "false");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Estimation app from Carbonaut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <Login onVisitRoom={visitRoom}></Login>
      </div>

      <footer>
        <a className={styles.footer} onClick={createRoom}>
          Criar uma sala
        </a>
      </footer>
    </div>
  );
};

export default Home;
