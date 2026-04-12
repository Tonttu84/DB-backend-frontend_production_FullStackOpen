import express from 'express'
import personsRouter from './routes/persons.js'
import errorHandler from './middleware/errorhandler.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(cors())
app.use(express.json())


app.use(express.static(path.join(__dirname, 'dist')))


app.use('/api/persons', personsRouter)


app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    return next()
  }

  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})


app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})


app.use(errorHandler)

export default app