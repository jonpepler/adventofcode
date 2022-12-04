import { fileToString } from '../../util'
import { countAllOverlappingSections, countOverlappingSections } from './4'

it('returns 2 for the part 1 test input', () => {
  const input = fileToString('4.test')
  expect(countOverlappingSections(input)).toEqual(2)
})

it('returns 4 for the part 2 test input', () => {
  const input = fileToString('4.test')
  expect(countAllOverlappingSections(input)).toEqual(4)
})
