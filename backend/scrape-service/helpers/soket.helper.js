import { Server } from "socket.io"
let io = null


export const initializeSocket = (server) => {
    io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } })
    io.on('connection', (socket) => {
        console.log('Socket connected : ', socket.id)
    })
}

export const emit = (event, message) => {
    io.emit(event, message)
}

