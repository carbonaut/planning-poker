import { useState } from "react";
import styles from "./loadingRoom.module.scss";

export interface LoadingProps {
  isScrumMaster: boolean;
  roomNumber: string;
  onStart: any;
}

const LoadingRoom = (props: LoadingProps) => {
  const [copied, setCopy] = useState(false);

  async function copyID() {
    let link = window.location.href;

    if (link.includes("?host=true")) {
      link = link.replace("?host=true", "");
    }

    // catch for chrome
    await navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 1000);
      })
      .catch(() => {
        // error toast
      });
  }

  return (
    <>
      {props.isScrumMaster ? (
        <>
          <p className={styles.title}>O ID da sala é:</p>
          <div className={styles.dashed}>
            <p onClick={copyID}>
              {" "}
              {props.roomNumber}{" "}
              {!copied && (
                <i className={`bi bi-front ${styles.dashedIcon}`}></i>
              )}
              {copied && (
                <i
                  className={`bi bi-check-circle-fill ${styles.dashedIcon}`}
                ></i>
              )}
            </p>
          </div>
          <button className={styles.button} onClick={props.onStart}>
            Iniciar votação
          </button>
        </>
      ) : (
        <>
          <p className={styles.title}>Aguardando inicio...</p>
          <div className={styles.loadingIcon}>
            <i className="bi bi-hourglass-split"></i>
          </div>
        </>
      )}
    </>
  );
};

export default LoadingRoom;
