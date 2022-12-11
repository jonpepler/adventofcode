import { getInput } from '../../util'
import { findMonkeyInspections } from './11'

it('returns 10605 for part 1 test puzzle input', async () => {
  const input = await getInput(11, true)
  expect(findMonkeyInspections(input)).toEqual(10605)
})
