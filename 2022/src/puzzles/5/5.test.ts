import { getInput } from '../../util'
import {
  getTop9001Crates,
  getTopCrates,
  processInput,
  WarehouseState,
} from './5'

it('transforms the puzzle input correctly', async () => {
  const input = await getInput(5, true)
  expect(processInput(input)).toMatchObject<WarehouseState>({
    crates: [['Z', 'N'], ['M', 'C', 'D'], ['P']],
    instructions: [
      { crates: 1, from: 2, to: 1 },
      { crates: 3, from: 1, to: 3 },
      { crates: 2, from: 2, to: 1 },
      { crates: 1, from: 1, to: 2 },
    ],
  })
})

it('returns CMZ for the part 1 test input', async () => {
  const input = await getInput(5, true)
  expect(getTopCrates(input)).toEqual('CMZ')
})

it('returns MCD for part 2 test input', async () => {
  const input = await getInput(5, true)
  expect(getTop9001Crates(input)).toEqual('MCD')
})
