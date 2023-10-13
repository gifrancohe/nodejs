const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
// app.disable('x-powered-by')

app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  // Hear the event data
  req.on('data', chunk => {
    body += chunk.toString()
  })

  // Stop to receive data
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    // Mutation the request and set the information in the request body
    req.body = data
    next()
  })
})

app.get('/pokemon/ditto', (req, res) => {
  res.send(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
