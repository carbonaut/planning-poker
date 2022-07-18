import { useEffect, useState } from "react";
import Button from "../Button/button";
import styles from "./login.module.scss";

interface LoginProps {
  onVisitRoom: (value: string) => any;
}

const Login = (props: LoginProps) => {
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(true);

  useEffect(() => {
    value.length !== 6 ? setInvalid(true) : setInvalid(false);
  }, [value]);

  const join = () => {
    if (invalid) {
      return;
    }

    props.onVisitRoom(value);
  };

  function keyDown(event: any) {
    // keycode 13 = enter
    if (event.keyCode !== 13) {
      return;
    }

    join();
  }

  return (
    <div className={`l-container ${styles.container}`}>
      <h2 className={styles.title}>Planning Poker</h2>
      <input
        className={`${styles.input} ${!invalid ? styles.inputSuccess : ""}`}
        maxLength={6}
        type="text"
        placeholder="ID da sala"
        onChange={(ev) => setValue(ev.target.value)}
        onKeyDown={keyDown}
      />
      <Button disabled={invalid} onClick={join} hasMargin={true}>
        Entrar
      </Button>
    </div>
  );
};

export default Login;
