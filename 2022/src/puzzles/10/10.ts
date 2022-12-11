import { sum } from '../../util'

type Noop = 'noop'
type Addx = `addx ${number}`
export type Instruction = Noop | Addx

export const processInput = (input: string): Instruction[] =>
  input.split('\n').reverse() as Instruction[]

type Pixel = 'light' | 'dark'
export class Crt {
  screen: Pixel[]

  constructor() {
    this.screen = Array.from({ length: 240 }).map(() => 'dark')
  }

  draw(spritePosition: number, cycle: number) {
    const row = Math.floor(cycle / 40)
    const spritePos = spritePosition + 40 * row
    this.screen[cycle] =
      spritePos === cycle || spritePos - 1 === cycle || spritePos + 1 === cycle
        ? 'light'
        : 'dark'
  }

  toString() {
    const render = (pixel: Pixel) => (pixel === 'light' ? '#' : '.')
    const rendered = this.screen.map(render)
    return [
      rendered.slice(0, 40).join(''),
      rendered.slice(40, 80).join(''),
      rendered.slice(80, 120).join(''),
      rendered.slice(120, 160).join(''),
      rendered.slice(160, 200).join(''),
      rendered.slice(200, 240).join(''),
    ].join('\n')
  }
}

export class Register {
  name: string
  value: number
  signalLog: number[]
  signalStart = 20
  crt: Crt

  constructor(name: string, value: number, crt: Crt) {
    this.name = name
    this.value = value
    this.signalLog = []
    this.crt = crt
  }

  add(value: number) {
    this.cycle()
    this.cycle()
    this.value += value
  }

  cycle() {
    this.crt.draw(this.value, this.signalLog.length)
    this.signalLog.push(this.value)
  }

  getCycleCount(): number {
    return this.signalLog.length
  }

  noop() {
    this.cycle()
  }

  getSignal() {
    return this.signalLog
      .map((value, index) => value * (index + 1))
      .filter(
        (_, index) =>
          index + 1 === this.signalStart ||
          (index + 1 - this.signalStart) % 40 === 0
      )
  }
}

export const findSignalStrength = (input: string) => {
  const crt = new Crt()
  const X = new Register('X', 1, crt)
  const instructions = processInput(input)
  let loop = 0
  const loops = instructions.length

  while (++loop < loops) {
    const instruction = instructions.pop()
    if (instruction === undefined) throw new Error('Ran out of instructions!')
    if (instruction === 'noop') X.noop()
    if (instruction.includes('addx')) X.add(Number(instruction.split(' ')[1]))
  }
  return X.getSignal().reduce(sum)
}

export const renderScreen = (input: string) => {
  const crt = new Crt()
  const X = new Register('X', 1, crt)
  const instructions = processInput(input)
  let loop = 0
  const loops = instructions.length

  while (++loop < loops) {
    const instruction = instructions.pop()
    if (instruction === undefined) throw new Error('Ran out of instructions!')
    if (instruction === 'noop') X.noop()
    if (instruction.includes('addx')) X.add(Number(instruction.split(' ')[1]))
  }
  return crt.toString()
}
