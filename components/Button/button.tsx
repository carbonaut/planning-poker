import styles from "./button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  type?: "primary" | "secondary";
  onClick?: () => any;
  children?: any;
}

const Button = ({
  disabled = false,
  type = "primary",
  onClick = () => null,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${
        type === "primary" ? styles.primary : styles.secondary
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
