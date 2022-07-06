import { useEffect, useState } from "react";
import { getRoomMemberLink } from "../../utils/utils";
import styles from "./loadingRoom.module.scss";
import Button from "../Button/button";

export interface LoadingProps {
  isScrumMaster: boolean;
  roomNumber: string;
  onStart: any;
  disabled: boolean;
}

const LoadingRoom = (props: LoadingProps) => {
  const [copied, setCopy] = useState(false);
  const [disabled, setDisable] = useState(true);

  useEffect(() => {
    props.disabled ? setDisable(false) : setDisable(true);
  }, [props.disabled]);

  async function copyID() {
    let link = getRoomMemberLink();

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

  function startVoting() {
    if (disabled) {
      return;
    }

    props.onStart();
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
          <Button onClick={startVoting} disabled={disabled} hasMargin={true}>
            Iniciar votação
          </Button>
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
