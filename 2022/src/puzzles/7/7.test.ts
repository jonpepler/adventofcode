import { fileToString } from '../../util'
import { getDeletableDirectory, getDirectorySizes } from './7'

it('returns 95437 for part 1 test input', () => {
  const input = fileToString('7.test')
  expect(getDirectorySizes(input)).toEqual(95437)
})

it('returns for the part 2 input', () => {
  const input = fileToString('7.test')
  expect(getDeletableDirectory(input).size).toEqual(24933642)
})
