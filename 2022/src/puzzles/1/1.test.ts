import { getInput } from '../../util'
import { top3Calories, topCalories } from './1'

it('outputs 24000 for the part 1 test input', async () => {
  const input = await getInput(1, true)
  expect(topCalories(input)).toEqual(24000)
})

it('outputs 45000 for the part 2 test input', async () => {
  const input = await getInput(1, true)
  expect(top3Calories(input)).toEqual(45000)
})
