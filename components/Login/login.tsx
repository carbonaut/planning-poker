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
    value.length === 0 ? setInvalid(true) : setInvalid(false);
  }, [value]);

  const join = () => {
    props.onVisitRoom(value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Planning Poker</h2>
      <input
        className={styles.input}
        type="text"
        placeholder="ID da sala"
        onChange={(ev) => setValue(ev.target.value)}
      />
      <Button disabled={invalid} onClick={join}>
        Entrar
      </Button>
    </div>
  );
};

export default Login;
