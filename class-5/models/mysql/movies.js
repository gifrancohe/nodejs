import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'gfrancoh',
  port: 3306,
  password: 'N0d3js.2023*',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const [genres] = await connection.query('SELECT id, name FROM genre WHERE LOWER(name) = ?', [genre.toLowerCase()])
      const { id } = genres?.[0] ?? 0
      const [movies] = await connection.query(`
        SELECT 
          title, 
          year, 
          director, 
          duration, 
          poster, 
          rate, 
          BIN_TO_UUID(m.id) id,
          g.name AS genre
        FROM movie AS m
        LEFT JOIN movie_genres AS mg ON mg.movie_id = m.id
        LEFT JOIN genre AS g ON g.id = mg.genre_id
        WHERE mg.genre_id = ?
        ;`, [id])
      return movies
    }

    const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;')
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?', [id])
    return movie
  }

  static async create ({ input }) {
    const { title, year, director, duration, poster, rate, genre } = input

    const [uuidResult] = await connection.query('SELECT UUID() AS uuid')
    const [{ uuid }] = uuidResult

    const newMovie = await connection.query(`
      INSERT INTO movie (id, title, year, director, duration, poster, rate)
      VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?);`, [title, year, director, duration, poster, rate]
    )

    if (newMovie) {
      // Convert the array to a comma-separated string
      const genreNamesString = genre.map((name) => connection.escape(name)).join(',')
      const [genreIds] = await connection.query(`SELECT id FROM genre WHERE name IN (${genreNamesString})`)
      if (genreIds) {
        const values = genreIds.map(({ id }) => {
          return `(UUID_TO_BIN("${uuid}"), ${id})`
        })
        const finalQuery = 'INSERT INTO movie_genres (movie_id, genre_id) VALUES ' + values.join(',') + ';'
        await connection.query(finalQuery)
      }
    }

    const [movie] = await connection.query(`
      SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
      FROM movie
      WHERE BIN_TO_UUID(id) = "${uuid}";`)
    return movie
  }

  static async delete ({ id }) {
    const [deleteMovie] = await connection.query(`
      DELETE FROM movie WHERE BIN_TO_UUID(id) = "${id}"
    `)
    if (deleteMovie) {
      const [deleteMovieGenre] = await connection.query(`
        DELETE FROM movie_genres WHERE BIN_TO_UUID(movie_id) = "${id}" 
      `)
      return !!deleteMovieGenre
    }
    return true
  }

  static async update ({ id, input }) {

  }
}
