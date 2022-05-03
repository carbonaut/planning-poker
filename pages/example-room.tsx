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
      socket.emit('join', '123')
    })

    socket.on('countUpdate', (data) => {
        setNoDevs(data);
    })

    socket.on('voteUpdate', (data) => {
        console.log(data)
    })

    socket.on('finished', (data) => {
        console.log('finished!', data)
    })
  }

  const handleVoteClick = () => {
      socket.emit('vote', '5')
  }

 

  return (
    <div>
      <h1>Room! Number of devs: {noDevs}</h1>
      <button onClick={handleVoteClick}>Vote!</button>
    </div>
  )
}

export default Home
