import path from 'path'
import { readFileSync } from 'fs'

export const fileToString = (filename: string) =>
  readFileSync(
    path.resolve(__dirname, '../input/' + filename + '.txt')
  ).toString()
