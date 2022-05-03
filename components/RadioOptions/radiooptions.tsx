import styles from "./radiooptions.module.scss";
import { useState } from "react";

const RadioOptions = () => {
  const [selected, setSelected] = useState(null);
  const hours = [1, 2, 3, 5, 8, 13, 21];

  function onChange(e) {
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
            onChange={onChange}
          />
          <span className={styles.text}>{hour}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioOptions;
