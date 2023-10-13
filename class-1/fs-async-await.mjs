// Use module to readFile  and use await
// This example is async sequence.

import { readFile } from 'fs/promises'

console.log('Leyendo el primer archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('Primer texto: ', text)

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', text2)
