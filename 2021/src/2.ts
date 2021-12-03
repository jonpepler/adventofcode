import fs from 'fs'

type Direction = 'forward' | 'up' | 'down'
type InstructionString = `${Direction} ${number}`
interface Instruction {
  direction: Direction
  distance: number
}

const isDirection = (str: string): str is Direction =>
  str === 'forward' || str === 'up' || str === 'down'

const isInstructionString = (str: string): str is InstructionString => {
  const parts = str.split(' ')
  if (parts.length !== 2) return false
  const direction = isDirection(parts[0])
  return direction && !isNaN(parseInt(parts[1]))
}

const isInstructionStringArray = (arr: string[]): arr is InstructionString[] =>
  arr.every((e) => isInstructionString(e))

const position = {
  depth: 0,
  horizontal: 0
}

const forward = (value: number): void => {
  position.horizontal += value
}

const down = (value: number): void => {
  position.depth += value
}

const up = (value: number): void => {
  position.depth -= value
}

const move = ({ direction, distance }: Instruction): void => {
  if (direction === 'down') down(distance)
  if (direction === 'up') up(distance)
  if (direction === 'forward') forward(distance)
}

const input = fs.readFileSync('./src/data/2.txt').toString().split('\n')
if (isInstructionStringArray(input)) {
  input
    .map((instruction) => {
      const parts = instruction.split(' ')
      return { direction: parts[0] as Direction, distance: parseInt(parts[1]) }
    })
    .forEach((instruction) => move(instruction))

  console.log(position.horizontal * position.depth)
}
