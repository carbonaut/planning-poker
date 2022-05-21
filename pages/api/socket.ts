export {};
/**
 * import type { NextApiRequest, NextApiResponse } from 'next'

import { Server } from 'socket.io'

type Data = {
  name: string
}

const createRoom = () => {
    return {
        state: 'waiting',
        count: 0,
        haveVoted: 0,
        votes: { '1': 0, '2': 0, '3': 0, '5': 0, '8': 0, '13': 0, '21': 0}
    }
}

const resetRoom = (room:any) => {
    const newRoom = {...room, state: 'running', haveVoted: 0, votes: { '1': 0, '2': 0, '3': 0, '5': 0, '8': 0, '13': 0, '21': 0}}
    return newRoom
}

export default function handler(
  req: any,
  res: any
) {
    
  if (res.socket!.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    let sockets:any = {}
    let roomTable:any = {}

    io.sockets.on('connection', socket => {
        socket.on('disconnect', () => {
            const roomId = sockets[socket.id].room
            if (roomTable[roomId]) {
                roomTable[roomId].count = roomTable[roomId].count - 1
            }
            
            io.sockets.in(roomId).emit('countUpdate', roomTable[roomId].count)
            delete sockets[socket.id]
        })

        socket.on('join', roomId => { 
            socket.join(roomId)

            // update sockets hash
            sockets[socket.id] = {
                room: roomId
            }
            
            // update rooms hash
            if (!roomTable[roomId]) {
                roomTable[roomId] = createRoom()
            }
            const room = { ...roomTable[roomId] }
            room.count = room.count + 1
            roomTable[roomId] = room
            
            io.sockets.in(roomId).emit('countUpdate', { count: roomTable[roomId].count, id: roomId })
        })

        socket.on('start', () => {
            const roomId = sockets[socket.id].room
            roomTable[roomId] = resetRoom(roomTable[roomId])
            io.sockets.in(roomId).emit('started', roomTable[roomId])
        })

        socket.on('reset', () => {
            const roomId = sockets[socket.id].room
            roomTable[roomId] = resetRoom(roomTable[roomId])
            io.sockets.in(roomId).emit('started', roomTable[roomId])
        })

        socket.on('finish', () => {
            const roomId = sockets[socket.id].room
            if (roomTable[roomId]) {
                roomTable[roomId] = { ...roomTable[roomId], state: 'finished' }
            }

            io.sockets.in(roomId).emit('finished', roomTable[roomId])
        })

        socket.on('vote', (vote) => {
            const roomId = sockets[socket.id].room
            if (roomTable[roomId]) {
                roomTable[roomId].votes[vote] = roomTable[roomId].votes[vote] + 1
                roomTable[roomId].haveVoted = roomTable[roomId].haveVoted + 1
            }

            if (roomTable[roomId].haveVoted >= roomTable[roomId].count) {
                roomTable[roomId] = { ...roomTable[roomId], state: 'finished' }
                io.sockets.in(roomId).emit('finished', roomTable[roomId])
            } else {
                io.sockets.in(roomId).emit('voteUpdate', roomTable[roomId].haveVoted)
            }
        })
        
    })

  }

  res.end()
}

**/
