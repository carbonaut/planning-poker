import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";

import Toast from "../components/Toast/toast";
import { useState } from "react";

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [toastTimeout, setToastTimeout] = useState();

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
    Router.push(`/room/${roomId}`);
    sessionStorage.setItem("isHost", "true");
  };

  const visitRoom = (roomId: string): void => {
    Router.push(`/room/${roomId}`);
    sessionStorage.setItem("isHost", "false");
  };

  /**
   * Shows a toast message when an error occurs
   * @param message text to be shown as a toast message
   */
  const showError = (message: string) => {
    // avoids hiding a toast before the 3s ends
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      setToastTimeout(undefined);
    }

    // show the toast message
    setErrorMessage({ message, type: "error", visible: true });

    // hides toast message after 3 seconds
    const eTimeout: any = setTimeout(() => {
      console.log(toastTimeout);
      hideToast();
    }, 3000);

    setToastTimeout(eTimeout);
  };

  const hideToast = () => {
    setErrorMessage({ ...errorMessage, visible: false });
    // clears the running timeout
    clearTimeout(toastTimeout);
    setToastTimeout(undefined);
  };

  return (
    <div className={styles.container}>
      <Toast
        message={errorMessage.message}
        visible={errorMessage.visible}
        type={errorMessage.type}
        onHide={hideToast}
      ></Toast>

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
