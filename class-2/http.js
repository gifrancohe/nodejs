const http = require('http') // Protocol HTTP
const fs = require('fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // Ok

    res.end('<h1>Welcome to my web page</h1>')
  } else if (req.url === '/contact') {
    res.statusCode = 200 // Ok
    res.end('<h1>Contact</h1>')
  } else if (req.url === '/cats.png') {
    fs.readFile('class-2/kitty.png', (_err, data) => {
      if (_err) {
        res.statusCode = 500 // Internal server error
        console.log('Error reading data: ', _err.message)
        res.end(`<h1>Error: ${_err.message}</h1>`)
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.statusCode = 200 // Ok
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404 // Ok
    res.end('<h1>Page not found, please reload</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server running on port http://localhost:${desiredPort}`)
})
