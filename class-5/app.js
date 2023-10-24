import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { routerMovies } from './routes/movies.js'

const app = express()
app.disable('x-powered-by')
app.use(json())

app.use(corsMiddleware())

app.use('/movies', routerMovies)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
