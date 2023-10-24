-- Command to create a new databases called moviesdb
DROP DATABASE IF EXISTS moviesdb;
CREATE DATABASE moviesdb;

-- Select previuos create databases moviesdb
USE moviesdb;

-- Create table movies
CREATE TABLE movie (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(1,1) UNSIGNED NOT NULL
);

-- Create table genre
CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create relation table movie_genres
CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movie(id),
    genre_id INT REFERENCES genre(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- Insert some values to genre table
INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-fi'),
('Romance');

-- Insert some values to movie table
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
(UUID_TO_BIN(UUID()), 'Interstellar', 2010, 'Christopher Nolan', 180, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.8),
(UUID_TO_BIN(UUID()), 'The Matrix', 1999, 'Lana Wachowski', 136, 'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg', 8.7),
(UUID_TO_BIN(UUID()), 'Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg', 8.9);

-- Insert values to movie_genres, get ids form the previous tables
INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Matrix'), (SELECT id FROM genre WHERE name = 'Sci-fi')),
((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Crime')),
((SELECT id FROM movie WHERE title = 'Pulp Fiction'), (SELECT id FROM genre WHERE name = 'Action'));


