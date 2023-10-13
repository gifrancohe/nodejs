import { readFile } from 'fs/promises'

console.log('Inicio el llamado a las promesas')
Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
]).then(([text, secondText]) => {
  console.log('Primer texto: ', text)
  console.log('Segundo texto: ', secondText)
})

console.log('Terminno el llamado a las promesas')
