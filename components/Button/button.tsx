import styles from "./button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => any;
  children?: any;
}

const Button = ({
  disabled = false,
  onClick = () => null,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
