import styles from "./estimation.module.scss";
import RadioOptions from "../RadioOptions/radiooptions";
import { useState } from "react";
import Countdown from "../Countdown/countdown";
import LoadingRoom from "../LoadingRoom/loadingRoom";
import Results from "../Results/results";

const Estimation = () => {
  const duration = 5;
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [running, setRunning] = useState(true);

  const votes = [
    { label: "13", count: 1, color: "#15C874" },
    { label: "8", count: 2, color: "#FBB751" },
    { label: "5", count: 1, color: "#00C6ED" },
  ];

  let timer: any;

  const start = () => {
    setLoading(false);
    timer = setInterval(() => {
      tick();
    }, 1000);
  };

  const tick = () => {
    setSecondsLeft((prev) => {
      if (prev === 1) {
        end();
      }
      return prev > 0 ? prev - 1 : 0;
    });
  };

  const end = () => {
    clearInterval(timer);
    setRunning(false);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <LoadingRoom
          isScrumMaster={true}
          roomNumber={"651232"}
          onStart={start}
        ></LoadingRoom>
      ) : (
        <>
          {running ? (
            <>
              <p className={styles.title}>Estimativa de tarefa</p>
              <p className={styles.description}>
                Quantas horas você acha que esta tarefa levará?
              </p>
              <RadioOptions></RadioOptions>
              <div className={styles.countdown}>
                <Countdown
                  duration={duration}
                  secondsLeft={secondsLeft}
                ></Countdown>
              </div>
            </>
          ) : (
            <div>
              <Results votes={votes}></Results>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Estimation;
