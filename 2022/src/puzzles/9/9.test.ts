import { getInput } from '../../util'
import { countLongTailPositions, countTailPositions } from './9'

// get this working again pls
it('returns 13 for part 1 puzzle test input', async () => {
  const input = await getInput(9, true)
  expect(countTailPositions(input)).toEqual(13)
})

it('returns 36 for part 2 puzzle input', () => {
  const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`
  expect(countLongTailPositions(input)).toEqual(36)
})
