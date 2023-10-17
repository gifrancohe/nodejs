const express = require('express')
const movies = require('./movies')
const crypto = require('crypto')
const { validateMovie } = require('./schemas/movies')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))

    if (!filteredMovies.length) res.status(404).json({ message: `Movie not found by genre: ${genre}` })
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => { // path-to-regexp
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (!movie) res.status(404).json({ message: 'Movie not found' })
  res.json(movie)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: result.error }) // 400 Bad Request
  }

  const newMovie = {
    id: crypto.randomBytes(20).toString('hex'),
    ...result.data
  }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
