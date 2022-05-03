import styles from "./loadingRoom.module.scss";

export interface LoadingProps {
  isScrumMaster: boolean;
  roomNumber: string;
  onStart: any;
}

const LoadingRoom = (props: LoadingProps) => {
  return (
    <>
      {props.isScrumMaster ? (
        <>
          <p className={styles.title}>O ID da sala é:</p>
          <div className={styles.dashed}>
            <p> {props.roomNumber} </p>
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
