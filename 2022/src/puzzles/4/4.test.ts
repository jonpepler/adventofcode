import { fileToString } from '../../util'
import { countOverlappingSections } from './4'

it('returns 2 for the part 1 test input', () => {
  const input = fileToString('4.test')
  expect(countOverlappingSections(input)).toEqual(2)
})
