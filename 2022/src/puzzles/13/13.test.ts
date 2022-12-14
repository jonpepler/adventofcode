import { getInput } from '../../util'
import { countCorrectSignals, sortSignal } from './13'

it('returns 13 for part 1 test input', async () => {
  const input = await getInput(13, true)
  expect(countCorrectSignals(input)).toEqual(13)
})

it('returns 140 for part 1 test input', async () => {
  const input = await getInput(13, true)
  expect(sortSignal(input)).toEqual(140)
})
