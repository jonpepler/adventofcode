import { getInput } from '../../util'
import { countImpossibleBeaconLocations, findBeaconTuningFrequency } from './15'

it('returns 26 for part 1 test input', async () => {
  const input = await getInput(15, true)
  expect(countImpossibleBeaconLocations(input, 10)).toEqual(26)
})

it('returns 56000011 for part 2 test input', async () => {
  const input = await getInput(15, true)
  expect(findBeaconTuningFrequency(input, 20)).toEqual(56000011)
})
