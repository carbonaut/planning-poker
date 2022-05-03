import styles from './estimation.module.scss';
import RadioOptions from '../RadioOptions/radiooptions'
import { useState } from 'react';
import Countdown from '../Countdown/countdown';

const Estimation = () => {
  const [ loading, setLoading ] = useState(false);

  return (
    <div className={styles.container}>
      { loading ? 
      <>
        <p className={styles.title}>Aguardando inicio...</p>
        <div className={styles.loadingIcon}>
          <i className="bi bi-hourglass-split"></i>
        </div>
      </> :
      <>
        <p className={styles.title}>Estimativa de tarefa</p>
        <p className={styles.description}>Quantas horas você acha que esta tarefa levará?</p>
        <RadioOptions></RadioOptions>
        <div className={styles.countdown}>
          <Countdown duration={10} secondsLeft={10}></Countdown>
        </div>
      </>
      }
    </div>
  )
}

export default Estimation;