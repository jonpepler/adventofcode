import { getInput } from '../../util'
import { countRestingSand, countBottomedRestingSand } from './14'

it('returns 24 for part 1 test input', async () => {
  const input = await getInput(14, true)
  expect(countRestingSand(input)).toEqual(24)
})

it('returns 93 for part 2 test input', async () => {
  const input = await getInput(14, true)
  expect(countBottomedRestingSand(input)).toEqual(93)
})
