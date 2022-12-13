import { getInput } from '../../util'
import {
  findShortestPath,
  findShortestPathWithMultipleStartingPoints,
} from './12'

it('returns 31 for part 1 test input', async () => {
  const input = await getInput(12, true)
  expect(findShortestPath(input)).toEqual(31)
})

it('returns 29 for part 2 test input', async () => {
  const input = await getInput(12, true)
  expect(findShortestPathWithMultipleStartingPoints(input)).toEqual(29)
})
