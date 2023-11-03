import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'

export const createMovieRouter = ({ MovieModel }) => {
  const routerMovies = Router()
  const movieController = new MovieController({ MovieModel })
  // Get methods
  routerMovies.get('/', movieController.getAll)
  routerMovies.get('/:id', movieController.getById)
  // Post methods
  routerMovies.post('/', movieController.create)
  routerMovies.delete('/:id', movieController.delete)
  routerMovies.patch('/:id', movieController.update)

  return routerMovies
}
