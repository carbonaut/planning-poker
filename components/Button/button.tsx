import styles from "./button.module.scss";

interface ButtonProps {
  disabled?: boolean;
  type?: "primary" | "secondary";
  onClick?: () => any;
  children?: any;
  hasMargin?: boolean;
  color?: "red";
  large?: boolean;
}

const Button = ({
  disabled = false,
  type = "primary",
  onClick = () => null,
  children,
  hasMargin,
  color,
  large = true,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""} ${
        type === "primary" ? styles.primary : styles.secondary
      } ${hasMargin ? styles.buttonMargin : ""} ${color ? styles[color] : ""} ${
        large ? styles.large : styles.normalSize
      }`}
      onClick={onClick}
    >
      {children}
      {hasMargin}
    </button>
  );
};

export default Button;
