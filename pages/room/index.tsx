import { NextPage } from "next";
import { useState } from "react";
import Estimation from "../../components/Estimation/estimation";
import styles from '../../styles/Room.module.scss';

const Room: NextPage = () => {
  const [quantity, setQuantity ] = useState(3);

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <i className="bi bi-people-fill"></i>
        { quantity }
      </div>
      <div className={styles.content}>
        <Estimation></Estimation>
      </div>

      <footer>
        <p className={styles.footer}>Criar uma sala</p>
      </footer>
    </div>
  )
}

export default Room;