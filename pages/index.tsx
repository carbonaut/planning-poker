import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  function createRoom() {}

  return (
    <div className={styles.container}>
      <Head>
        <title>Planning Poker</title>
        <meta name="description" content="Estimation app from Carbonaut" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.content}>
        <Login></Login>
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
