import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
let socket

const Home: NextPage = () => {
  const [noDevs, setNoDevs] = useState(0)
  useEffect(() => () => {socketInitializer()}, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      socket.emit('room', '123')
    })

    socket.on('countUpdate', (data) => {
        setNoDevs(data);
    })
  }

 

  return (
    <div>
      <h1>Room! Number of devs: {noDevs}</h1>
    </div>
  )
}

export default Home
