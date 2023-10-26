import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'gfrancoh',
  port: 3306,
  password: 'N0d3js.2023*',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

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

  }

  static async create ({ input }) {

  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
