import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validationPartialMovie } from '../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (!movie) res.status(404).json({ message: 'Movie not found' })
    res.json(movie)
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(422).json({ error: result.error }) // 400 Bad Request
    }

    const newMovie = await MovieModel.create(result.data)
    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
    const { id } = req.params
    console.log(id)
    const movieIndex = await MovieModel.delete({ id })
    console.log(movieIndex)
    if (!movieIndex) return res.status(404).json({ message: 'Movie not found' })
    return res.json({ message: 'Movie deleted' })
  }

  static async update (req, res) {
    const result = validationPartialMovie(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params

    const updateMovie = await MovieModel.update({ id, input: result.data })

    res.status(200).json(updateMovie)
  }
}
