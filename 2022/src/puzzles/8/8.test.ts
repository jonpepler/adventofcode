import { getInput } from '../../util'
import { countVisibleTrees, findScenicSpot, getViewDistance, Tree } from './8'

it('returns 21 for part 1 puzzle input', async () => {
  const input = await getInput(8, true)
  expect(countVisibleTrees(input)).toEqual(21)
})

it('returns 8 for part 2 puzzle input', async () => {
  const input = await getInput(8, true)
  expect(findScenicSpot(input)).toEqual(8)
})

it('returns correct viewDistance value for a given tree line', () => {
  const fakeTree = (height: number) => ({ height } as Tree)
  expect(getViewDistance(5, [fakeTree(4), fakeTree(3), fakeTree(2)])).toEqual(3)
})
