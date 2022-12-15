import { getInput } from '../../util'
import { countImpossibleBeaconLocations } from './15'

it('returns 26 for part 1 test input', async () => {
  const input = await getInput(15, true)
  expect(countImpossibleBeaconLocations(input, 10)).toEqual(26)
})
