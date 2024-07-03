import 'dotenv/config'
import express from 'express'
import scrapeRouter from './routes/scrape.js'
import db from './config/connection.js'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Events } from './utils/constant.js'
import { initializeSocket } from './helpers/soket.helper.js'

db.connectDB()
const app = express()
const port = 4115

app.get('/', (req, res) => {
    res.send('Made by Anoop')
})

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use('/scrape', scrapeRouter)


const server = createServer(app);
initializeSocket(server)

server.listen(port, () => {
    console.log(`Server running : http://localhost:${port}`)
})