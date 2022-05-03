import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import io from 'Socket.IO-client'
let socket: any

const Home: NextPage = () => {
  const [noDevs, setNoDevs] = useState(0)
  useEffect(() => () => {socketInitializer()}, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      socket.emit('join', '123')
    })

    socket.on('countUpdate', (data: any) => {
        setNoDevs(data);
    })

    socket.on('voteUpdate', (data: any) => {
        console.log(data)
    })

    socket.on('finished', (data: any) => {
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
