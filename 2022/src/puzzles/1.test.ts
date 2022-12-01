import { fileToString } from '../util'
import { top3Calories, topCalories } from './1'

it('outputs 24000 for the part 1 test input', () => {
  const input = fileToString('../input/1.test.txt')
  expect(topCalories(input)).toEqual(24000)
})

it('outputs 45000 for the part 2 test input', () => {
  const input = fileToString('../input/1.test.txt')
  expect(top3Calories(input)).toEqual(45000)
})
