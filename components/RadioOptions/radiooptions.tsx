import styles from "./radiooptions.module.scss";
import { useState } from "react";

interface Radio {
  onChange: any;
}

const RadioOptions = (props: Radio) => {
  const [selected, setSelected] = useState(null);
  const hours = [1, 2, 3, 5, 8, 13, 21];

  function vote(e: any) {
    setSelected(e.target.value);
  }

  return (
    <div className={styles.options}>
      {hours.map((hour) => (
        <label key={hour} htmlFor={`${hour}`} className={styles.option}>
          <input
            className={styles.input}
            id={`${hour}`}
            type="radio"
            name="voteHour"
            value={hour}
            onChange={(e) => {vote(e); props.onChange(e)}}
          />
          <span className={styles.text}>{hour}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioOptions;
