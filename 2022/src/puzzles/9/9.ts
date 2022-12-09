/*
== Initial State ==

......
......
......
......
H.....
*/

enum GridItem {
  Empty,
  Head,
  Tail,
  HeadAndTail,
}
type Location = [number, number]

interface Instruction {
  direction: 'L' | 'R' | 'U' | 'D'
  distance: number
}
type Instructions = Instruction[]

const convertDirectionToCoords = (
  directions: Instruction['direction'][] | undefined
) =>
  directions === undefined
    ? [0, 0]
    : directions
        .map((direction) =>
          direction === 'D'
            ? [0, -1]
            : direction === 'L'
            ? [-1, 0]
            : direction === 'R'
            ? [1, 0]
            : [0, 1]
        )
        .reduce(([x, y], [x2, y2]) => [x + x2, y + y2])

class Grid {
  grid: GridItem[][]
  headLoc: Location = [0, 0]
  tailLoc: Location = [0, 0]
  tailVisitGrid: boolean[][]
  tailVisits = 1

  constructor() {
    this.grid = [[GridItem.HeadAndTail]]
    this.tailVisitGrid = [[true]]
  }

  at(x: number, y: number) {
    return this.grid[y][x]
  }

  set(value: GridItem, x: number, y: number) {
    if (this.grid[y] === undefined) this.grid[y] = []
    this.grid[y][x] = value
    if (value === GridItem.Head) this.headLoc = [x, y]
    if (value === GridItem.Tail) {
      this.tailLoc = [x, y]
      if (this.tailVisitGrid[y] === undefined) {
        this.tailVisitGrid[y] = []
      }
      if (this.tailVisitGrid[y][x] === undefined) {
        this.tailVisits++
        this.tailVisitGrid[y][x] = true
      }
    }
  }

  move(obj: GridItem, x: number, y: number) {
    if (obj === GridItem.Empty) return

    if (obj === GridItem.Head) {
      if (this.at(...this.headLoc) === GridItem.HeadAndTail)
        this.set(GridItem.Tail, ...this.headLoc)
      else this.set(GridItem.Empty, ...this.headLoc)
      const newX = this.headLoc[0] + x
      const newY = this.headLoc[1] + y
      this.set(GridItem.Head, newX, newY)

      const [tailX, tailY] = convertDirectionToCoords(this.checkTail())
      this.move(GridItem.Tail, tailX, tailY)
    }

    if (obj === GridItem.Tail) {
      this.set(GridItem.Empty, ...this.tailLoc)
      const newX = this.tailLoc[0] + x
      const newY = this.tailLoc[1] + y
      this.set(GridItem.Tail, newX, newY)
    }
  }

  checkTail(): Instruction['direction'][] | undefined {
    if (
      this.headLoc[0] - this.tailLoc[0] > 1 &&
      this.headLoc[1] !== this.tailLoc[1]
    )
      return ['R', this.headLoc[1] > this.tailLoc[1] ? 'U' : 'D']
    if (
      this.headLoc[0] - this.tailLoc[0] < -1 &&
      this.headLoc[1] !== this.tailLoc[1]
    )
      return ['L', this.headLoc[1] > this.tailLoc[1] ? 'U' : 'D']
    if (
      this.headLoc[1] - this.tailLoc[1] > 1 &&
      this.headLoc[0] !== this.tailLoc[0]
    )
      return ['U', this.headLoc[0] > this.tailLoc[0] ? 'R' : 'L']
    if (
      this.headLoc[1] - this.tailLoc[1] < -1 &&
      this.headLoc[0] !== this.tailLoc[0]
    )
      return ['D', this.headLoc[0] > this.tailLoc[0] ? 'R' : 'L']
    if (this.headLoc[0] - this.tailLoc[0] > 1) return ['R']
    if (this.headLoc[0] - this.tailLoc[0] < -1) return ['L']
    if (this.headLoc[1] - this.tailLoc[1] > 1) return ['U']
    if (this.headLoc[1] - this.tailLoc[1] < -1) return ['D']
    return undefined
  }

  toString() {
    return this.grid
      .map((line) =>
        line
          .map((gi) =>
            gi === GridItem.Empty
              ? '.'
              : gi === GridItem.Head
              ? 'H'
              : gi === GridItem.Tail
              ? 'T'
              : 'B'
          )
          .join('')
      )
      .join('\n')
  }
}

const processInput = (input: string): Instructions =>
  input.split('\n').map((instr) => {
    const [direction, distance] = instr.split(' ') as [
      Instruction['direction'],
      Instruction['distance']
    ]
    if (direction === undefined || distance === undefined)
      throw new Error('Bad instruction: ' + instr)

    return { direction, distance }
  })

export const countTailPositions = (input: string): number => {
  const instructions = processInput(input)
  const grid = new Grid()
  instructions.forEach(({ direction, distance }) => {
    const [x, y] = convertDirectionToCoords([direction])
    Array.from({ length: distance }).forEach(() => {
      grid.move(GridItem.Head, x, y)
    })
  })
  return grid.tailVisits
}
