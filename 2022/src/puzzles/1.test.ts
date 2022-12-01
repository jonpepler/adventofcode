import { readFileSync } from 'fs'
import path from 'path'
import { countCalories } from './1'

it('outputs 24000 for the test input', () => {
  const input = readFileSync(path.resolve(__dirname, '../input/1.test.txt')).toString()
  expect(countCalories(input)).toEqual(24000)
})
