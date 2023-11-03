// import { MovieModel } from '../models/local-file-system/movie.js'
// import { MovieModel } from '../models/mysql/movies.js'
import { validateMovie, validationPartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor ({ MovieModel }) {
    this.movieModel = MovieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (!movie) res.status(404).json({ message: 'Movie not found' })
    res.json(movie)
  }

  create = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(422).json({ error: result.error }) // 400 Bad Request
    }

    const newMovie = await this.movieModel.create({ input: result.data })
    res.status(201).json(newMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const movieIndex = await this.movieModel.delete({ id })
    console.log(movieIndex)
    if (!movieIndex) return res.status(404).json({ message: 'Movie not found' })
    return res.json({ message: 'Movie deleted' })
  }

  update = async (req, res) => {
    const result = validationPartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updateMovie = await this.movieModel.update({ id, input: result.data })

    res.status(200).json(updateMovie)
  }
}
