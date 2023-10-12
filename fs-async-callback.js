/* eslint-disable n/handle-callback-err */
// Use CommonJS and async read function and callbacks
// This method don't block the thread and execute all the code async
const fs = require('fs')

console.log('Leyendo el primer archivo ...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log('Primer texto: ', text)
})

console.log('Hacer cosas mientras lee el archivo ...')

console.log('Leyendo el segundo archivo ...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  console.log('Segundo texto: ', text)
})

console.log('Terminando ...')
