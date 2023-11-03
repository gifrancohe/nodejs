import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'
import 'dotenv/config'

export const createApp = ({ MovieModel }) => {
  const app = express()
  app.disable('x-powered-by')
  app.use(json())

  app.use(corsMiddleware())

  app.use('/movies', createMovieRouter({ MovieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })

  return app
}
