import { useState } from "react";
import styles from "./login.module.scss";

const Login = (props: any) => {
  const [value, setValue] = useState("");

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CarboLab</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="ID da sala"
        onChange={(ev) => setValue(ev.target.value)}
      />
      <button
        className={`${styles.button} ${
          value.length == 0 ? styles.disabled : ""
        }`}
        onClick={() => {
          props.onVisitRoom(value);
        }}
      >
        Entrar
      </button>
    </div>
  );
};

export default Login;
