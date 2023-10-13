const fs = require('fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  'Archivo: ' + stats.isFile() + '\n',
  'Directorio: ' + stats.isDirectory() + '\n',
  'Enlace: ' + stats.isSymbolicLink() + '\n',
  'Tamaño: ' + stats.size
)
