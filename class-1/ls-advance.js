/* eslint-disable prefer-const */
const fs = require('fs/promises')
const path = require('path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

// Function to read directory and return his files
async function readDir (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.log(pc.red(`No se puso leer el directorio ${folder}`))
    process.exit(1)
  }
  return files
}

async function ls (folder) {
  let files

  // Get files from directory folder
  files = await readDir(folder)

  const filePromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch {
      console.log(pc.red(`No se pudo leer el archivo ${filePath}`))
    }

    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : 'f'
    const fileSize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.red(fileSize.toString().padStart(10))} ${pc.yellow(fileModified)}`
  })

  const fileInfo = await Promise.all(filePromises)

  fileInfo.forEach(fileInfo => console.log(fileInfo))
}

ls(folder)
