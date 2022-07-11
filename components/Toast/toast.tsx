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
      }`}
    >
      <div className={styles.text}>{props.message}</div>
      <div className={styles.button}>
        <button className="button button-icon" onClick={props.onHide}>
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
};

export default Toast;
