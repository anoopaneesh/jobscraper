import 'dotenv/config'
import express from 'express'
import companyRouter from './routes/company.js'
import scrapeRouter from './routes/scrape.js'
import db from './config/connection.js'
import jobsRouter from './routes/job.js'
import analyzeRouter from './routes/analyze.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'

db.connectDB()
const app = express()

const port = 4114

app.get('/', (req, res) => {
    res.send('Made by Anoop')
})

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use('/jobs', jobsRouter)
app.use('/company', companyRouter)
app.use('/scrape', scrapeRouter)
app.use('/analyze',analyzeRouter)


app.listen(port,() => {
    console.log(`Server running : http://localhost:${port}`)
})