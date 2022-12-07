import { fileToString } from '../../util'
import { getDirectorySizes, printNode, processInput } from './7'

it('returns 95437 for part 1 test input', () => {
  const input = fileToString('7.test')
  expect(getDirectorySizes(input)).toEqual(95437)
})
