import React, { useEffect, useState } from "react";
import styles from "./countdown.module.scss";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CountdownProps {
  duration: number;
  secondsLeft: number;
}

export default function Countdown(props: CountdownProps) {
  const [color, setColor] = useState("#15C874");

  useEffect(() => {
    if (props.secondsLeft <= props.duration / 2) {
      setColor("#EFFF31");
    }

    if (props.secondsLeft <= props.duration / 4) {
      setColor("#F04943");
    }
  }, [props.secondsLeft]);

  return (
    <div className={styles.countdown}>
      <CircularProgressbar
        value={(props.secondsLeft / props.duration) * 100}
        text={`${props.secondsLeft}`}
        strokeWidth={5}
        styles={buildStyles({
          textSize: "40px",
          pathColor: color,
          textColor: color,
          trailColor: "#23292C",
          pathTransition: "linear 1s",
          strokeLinecap: "butt",
        })}
      />
    </div>
  );
}
