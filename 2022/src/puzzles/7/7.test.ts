import { getInput } from '../../util'
import { getDeletableDirectory, getDirectorySizes } from './7'

it('returns 95437 for part 1 test input', async () => {
  const input = await getInput(7, true)
  expect(getDirectorySizes(input)).toEqual(95437)
})

it('returns for the part 2 input', async () => {
  const input = await getInput(7, true)
  expect(getDeletableDirectory(input).size).toEqual(24933642)
})
