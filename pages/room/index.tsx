import { NextPage } from "next";
import Estimation from "../../components/Estimation/estimation";
import styles from '../../styles/Room.module.scss';

const Room: NextPage = () => {
  return (
    <div className={styles.container}>
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