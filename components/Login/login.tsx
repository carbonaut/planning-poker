import styles from './login.module.scss';

const Login = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CarboLab</h2>
      <input className={styles.input} type="text" placeholder="ID da sala"/>
      <button className={styles.button}>Entrar</button>
    </div>
  )
}

export default Login;