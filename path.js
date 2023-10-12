const path = require('path')

// Barra separadora según SO
console.log('Sep: ', path.sep)

// Unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log('File path: ', filePath)

// base del fichero
const base = path.basename(filePath)
console.log('Base: ', base)

// Get extension file
const ext = path.extname(filePath)
console.log('Ext: ', ext)

// Nombre del fichero sin la extensión
const name = path.basename(filePath, ext)
console.log('Name: ', name)
