import styles from './estimation.module.scss';
import { useState } from 'react';

const Estimation = () => {
  const [ loading, setLoading ] = useState(true);

  return (
    <div className={styles.container}>
      { loading ? 
      <div>
        <p className={styles.title}>Aguardando inicio...</p>
      </div> :
      <></>}
    </div>
  )
}

export default Estimation;