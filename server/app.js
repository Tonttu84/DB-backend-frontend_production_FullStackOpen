import express from 'express'
import personsRouter from './routes/persons.js'
import errorHandler from './middleware/errorhandler.js'
import cors from 'cors'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static(path.resolve('dist')))

app.use('/api/persons', personsRouter)

app.use((req, res, next) => {
	if (req.originalUrl.startsWith('/api')) {
	  return next()
	}
	res.sendFile(path.resolve('dist/index.html'))
  })

 app.use((req, res) => {
   res.status(404).json({ error: 'unknown endpoint' })
 })

app.use(errorHandler)

export default app