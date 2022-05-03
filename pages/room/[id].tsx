import { NextPage } from "next";
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
import Estimation from "../../components/Estimation/estimation";
import styles from '../../styles/Room.module.scss';

let socket: any
const Room: NextPage = () => {
  const router = useRouter()
  const { pid } = router.query

  const [noDevs, setNoDevs] = useState(0)
  useEffect(() => () => {socketInitializer()}, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      socket.emit('join', pid)
    })
  }

  
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