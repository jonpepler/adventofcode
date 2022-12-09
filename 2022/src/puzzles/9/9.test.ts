import { getInput } from '../../util'
import { countTailPositions } from './9'

it('returns 13 for part 1 puzzle test input', async () => {
  const input = await getInput(9, true)
  expect(countTailPositions(input)).toEqual(13)
})
