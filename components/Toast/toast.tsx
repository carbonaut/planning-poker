import styles from "./toast.module.scss";

interface ToastProps {
  type?: string; // error, success
  visible: boolean;
  message?: string;
  onHide?: any;
}

const Toast = (props: ToastProps) => {
  return (
    <div
      className={`${styles.container} bg-${props.type} ${
        props.visible ? styles.active : ""
      } ${props.type === "error" ? styles.error : ""}`}
    >
      <div className={styles.text}>{props.message}</div>
      <button className={styles.button} onClick={props.onHide}>
        <i className={`bi bi-x ${styles.icon}`}></i>
      </button>
    </div>
  );
};

export default Toast;
