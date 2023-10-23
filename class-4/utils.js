import { createRequire } from 'module'
const require = createRequire(import.meta.url)

export const readJson = (path) => require(path)
