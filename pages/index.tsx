import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
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

  const createRoom = (): void => {
    let roomId = randomString();
    Router.push(`room/${roomId}`);
    sessionStorage.setItem("isHost", "true");
  };

  const visitRoom = (roomId: string): void => {
    sessionStorage.setItem("isHost", "false");
    Router.push(`room/${roomId}`);
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
        <p>
          <a className={styles.footer} onClick={createRoom}>
            Criar uma sala
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
