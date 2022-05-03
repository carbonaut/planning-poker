import styles from "./estimation.module.scss";
import RadioOptions from "../RadioOptions/radiooptions";
import { useState } from "react";
import Countdown from "../Countdown/countdown";
import LoadingRoom from "../LoadingRoom/loadingRoom";

const Estimation = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingRoom isScrumMaster={true} roomNumber={"651232"}></LoadingRoom>
      ) : (
        <>
          <p className={styles.title}>Estimativa de tarefa</p>
          <p className={styles.description}>
            Quantas horas você acha que esta tarefa levará?
          </p>
          <RadioOptions></RadioOptions>
          <div className={styles.countdown}>
            <Countdown duration={10} secondsLeft={10}></Countdown>
          </div>
        </>
      )}
    </div>
  );
};

export default Estimation;
