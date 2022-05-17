import styles from "./loadingRoom.module.scss";

export interface LoadingProps {
  isScrumMaster: boolean;
  roomNumber: string;
  onStart: any;
}

const LoadingRoom = (props: LoadingProps) => {
  async function copyID() {
    // catch for chrome
    await navigator.clipboard.writeText(props.roomNumber)
    .then(() => {
      // success toast
    })
    .catch(() => {
      // error toast
    })
  }
  
  return (
    <>
      {props.isScrumMaster ? (
        <>
          <p className={styles.title}>O ID da sala é:</p>
          <div className={styles.dashed}>
            <p onClick={copyID}> {props.roomNumber} </p>
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
