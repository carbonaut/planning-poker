// components/layout.js

import React from "react";

import styles from "./countdown.module.scss";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CountdownProps {
  duration: number;
  secondsLeft: number;
}

export default function Countdown(props: CountdownProps) {
  return (
    <div className={styles.countdown}>
      <CircularProgressbar
        value={(props.secondsLeft / props.duration) * 100}
        text={`${props.secondsLeft}`}
        strokeWidth={5}
        styles={buildStyles({
          textSize: "40px",
          pathColor: "#15C874",
          textColor: "#15C874",
          trailColor: "#E4E8EA",
          pathTransition: "linear 1s",
          strokeLinecap: "butt",
        })}
      />
    </div>
  );
}
