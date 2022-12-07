import { getInput } from '../../util'
import { countAllOverlappingSections, countOverlappingSections } from './4'

it('returns 2 for the part 1 test input', async () => {
  const input = await getInput(4, true)
  expect(countOverlappingSections(input)).toEqual(2)
})

it('returns 4 for the part 2 test input', async () => {
  const input = await getInput(4, true)
  expect(countAllOverlappingSections(input)).toEqual(4)
})
