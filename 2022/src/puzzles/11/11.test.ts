import { getInput } from '../../util'
import { findMonkeyInspections, findWorriedMonkeyInspections } from './11'

it('returns 10605 for part 1 test input', async () => {
  const input = await getInput(11, true)
  expect(findMonkeyInspections(input)).toEqual(10605)
})

it('returns 2713310158 for part 2 test input', async () => {
  const input = await getInput(11, true)
  expect(findWorriedMonkeyInspections(input)).toEqual(2713310158)
})
