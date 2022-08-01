import { useEffect, useState } from "react";
import styles from "./results-message.module.scss";

interface ResultsMessageProps {
  status: number;
}

const ResultsMessage = (props: ResultsMessageProps) => {
  const [message, setMessage] = useState("");

  const drawMessages = [
    "Viiish",
    "Isso não deveria acontecer",
    "Não foi desta vez :(",
  ];

  const winnerMessages = [
    "Temos um resultado",
    "Tudo certo, nada resolvido",
    "Não é o ideal mas acontece",
  ];

  const consensusMessages = [
    "Temos consenso",
    "Que time lindo, escorreu até uma lagrima :,)",
    "Ai que emoção!",
    "Essa gente é tudo de bom",
  ];

  useEffect(() => {
    pickMessage();
  }, [props.status]);

  function pickMessage() {
    const messages: any = pickList();

    const index = Math.floor(Math.random() * messages.length);
    setMessage(messages[index]);
  }

  function pickList() {
    switch (props.status) {
      case 1:
        return drawMessages;
      case 2:
        return winnerMessages;
      case 3:
        return consensusMessages;
    }
  }

  return (
    <div className={styles.result}>
      <i
        className={`bi bi-${
          props.status === 1
            ? "exclamation-circle-fill u-color--red"
            : "check-circle-fill u-color--green"
        } ${styles.icon}`}
      ></i>
      <span>{message}</span>
    </div>
  );
};

export default ResultsMessage;
