import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let sockets = {}
    let roomTable = {}

    io.sockets.on('connection', socket => {
        socket.on('disconnect', () => {
            const roomId = sockets[socket.id].room
            if (roomTable[roomId]) {
                roomTable[roomId].count = roomTable[roomId].count - 1
            }

            console.log(sockets)
            
            io.sockets.in(roomId).emit('countUpdate', roomTable[roomId].count)
            delete sockets[socket.id]
        })

        socket.on('room', roomId => { 
            socket.join(roomId)

            // update sockets hash
            sockets[socket.id] = {
                room: roomId
            }
            
            // update rooms hash
            if (!roomTable[roomId]) {
                roomTable[roomId] = {
                    count: 0
                }
            }
            const room = { ...roomTable[roomId] }
            room.count = room.count + 1
            roomTable[roomId] = room
            
            io.sockets.in(roomId).emit('countUpdate', roomTable[roomId].count)
        })
    })

  }

  res.end()
}
