import type { NextPage } from "next";
import Router from "next/router";
import Head from "next/head";
import Login from "../components/Login/login";
import styles from "../styles/Home.module.scss";

import Toast from "../components/Toast/toast";
import { useState } from "react";
import Button from "../components/Button/button";

const Home: NextPage = () => {
  const [errorMessage, setErrorMessage] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [toastTimeout, setToastTimeout] = useState();

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

  const showError = (message: string) => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      setToastTimeout(undefined);
    }

    setErrorMessage({ message, type: "error", visible: true });

    const eTimeout: any = setTimeout(() => {
      hideToast();
    }, 3000);

    setToastTimeout(eTimeout);
  };

  const hideToast = () => {
    setErrorMessage({ ...errorMessage, visible: false });
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
