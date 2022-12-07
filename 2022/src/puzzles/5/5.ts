import { concatStringArray } from '../../util'

type Crate = string
type CrateRack = Crate[]
type CrateRacks = CrateRack[]
interface CraneInstruction {
  crates: number
  from: number
  to: number
}

export interface WarehouseState {
  crates: CrateRacks
  instructions: CraneInstruction[]
}

export const processInput = (input: string): WarehouseState => {
  const [crates, instructions] = input.split('\n\n')
  const crateLines = crates
    .split('\n')
    .slice(0, -1)
    .map((line) => line.split(''))

  return {
    crates: crateLines[0]
      .map((_, colIndex) => crateLines.map((row) => row[colIndex]))
      .filter((line) => line.some((chr) => chr.match(/[A-Z]/)))
      .map((line) => line.filter((chr) => chr !== ' ').reverse()),
    instructions: instructions.split('\n').map((instruction) => {
      const match = instruction.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/)
      if (match === null) throw new Error('Corupt instruction?: ' + instruction)
      return {
        crates: Number(match[1]),
        from: Number(match[2]),
        to: Number(match[3]),
      }
    }),
  }
}

const crateRacksToString = (crateRacks: CrateRacks) =>
  crateRacks.map((rack, index) => index + 1 + ' ' + rack.toString()).join('\n')

const moveCrate = (
  crateRacks: CrateRacks,
  { crates, from, to }: CraneInstruction
): CrateRacks => {
  Array.from({ length: crates }).forEach(() => {
    const crate = crateRacks[from - 1].pop()
    if (crate === undefined) {
      throw new Error(
        'No crate to take! ' +
          '\n' +
          crateRacksToString(crateRacks) +
          '\n' +
          `From: ${from}, To: ${to}`
      )
    }
    crateRacks[to - 1].push(crate)
  })
  return crateRacks
}

const moveCrate9001 = (
  crateRacks: CrateRacks,
  { crates, from, to }: CraneInstruction
): CrateRacks => {
  const cratesToMove = crateRacks[from - 1].splice(-crates)

  crateRacks[to - 1].push(...cratesToMove)
  return crateRacks
}

export const getTopCrates = (input: string): string => {
  const { crates, instructions } = processInput(input)

  instructions.forEach((instruction) => {
    moveCrate(crates, instruction)
  })

  return crates
    .flatMap((crateRack) => crateRack.slice(-1))
    .reduce(concatStringArray)
}

export const getTop9001Crates = (input: string): string => {
  const { crates, instructions } = processInput(input)

  instructions.forEach((instruction) => {
    moveCrate9001(crates, instruction)
  })

  return crates
    .flatMap((crateRack) => crateRack.slice(-1))
    .reduce(concatStringArray)
}
