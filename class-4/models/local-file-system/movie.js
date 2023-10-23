import { readJson } from '../../utils.js'
import { randomBytes } from 'crypto'

const movies = readJson('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create (input) {
    const newMovie = {
      id: randomBytes(20).toString('hex'),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    console.log('Model: ' + id)
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const index = movies.findIndex(movie => movie.id === id)
    if (index === -1) return false
    const updateMovie = {
      ...movies[index],
      ...input
    }
    movies[index] = updateMovie
    return updateMovie
  }
}
