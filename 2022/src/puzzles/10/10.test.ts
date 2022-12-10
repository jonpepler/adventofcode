import { getInput } from '../../util'
import { findSignalStrength, renderScreen } from './10'

it('returns 13140 for part 1 puzzle input', async () => {
  const input = await getInput(10, true)
  expect(findSignalStrength(input)).toEqual(13140)
})

it('outputs a matching screen render for part 2 puzzle input', async () => {
  const input = await getInput(10, true)
  expect(renderScreen(input)).toEqual(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`)
})
