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
  knots: Location[] = []
  tailVisitGrid: boolean[][]
  tailVisits = 1

  constructor(knots = 0) {
    this.grid = [[GridItem.HeadAndTail]]
    this.tailVisitGrid = [[true]]
    this.knots = [
      this.headLoc,
      ...Array.from({ length: knots }).map(() => [0, 0] as Location),
      this.tailLoc,
    ]
  }

  getHeadLoc() {
    return this.knots[0]
  }

  getTailLoc() {
    return this.knots[this.knots.length - 1]
  }

  at(x: number, y: number) {
    return this.grid[y][x]
  }

  set(value: GridItem, x: number, y: number, tailIndex?: number) {
    if (this.grid[y] === undefined) this.grid[y] = []
    this.grid[y][x] = value
    if (value === GridItem.Head) this.knots[0] = [x, y]
    if (value === GridItem.Tail && tailIndex !== undefined) {
      this.knots[tailIndex] = [x, y]
      if (tailIndex === this.knots.length - 1) {
        if (this.tailVisitGrid[y] === undefined) {
          this.tailVisitGrid[y] = []
        }
        if (this.tailVisitGrid[y][x] === undefined) {
          this.tailVisits++
          this.tailVisitGrid[y][x] = true
        }
      }
    }
  }

  move(obj: GridItem, x: number, y: number) {
    if (obj === GridItem.Empty) return

    if (obj === GridItem.Head) {
      if (this.at(...this.getHeadLoc()) === GridItem.HeadAndTail)
        this.set(GridItem.Tail, ...this.getHeadLoc())
      else this.set(GridItem.Empty, ...this.getHeadLoc())
      const newX = this.getHeadLoc()[0] + x
      const newY = this.getHeadLoc()[1] + y
      this.set(GridItem.Head, newX, newY)
      this.moveTail()
    }
  }

  moveTail() {
    Array.from({ length: this.knots.length - 1 }).forEach((_, index) => {
      const tailtalk = this.checkTail(index + 1)
      const [tailX, tailY] = convertDirectionToCoords(tailtalk)
      this.set(GridItem.Empty, ...this.knots[index + 1])
      const newX = this.knots[index + 1][0] + tailX
      const newY = this.knots[index + 1][1] + tailY
      this.set(GridItem.Tail, newX, newY, index + 1)
    })
  }

  checkTail(knotIndex: number): Instruction['direction'][] | undefined {
    const leadingKnot = this.knots[knotIndex - 1]
    const movingKnot = this.knots[knotIndex]
    const xDiff = leadingKnot[0] - movingKnot[0]
    const yDiff = leadingKnot[1] - movingKnot[1]
    const movingKnotFarLeft = xDiff > 1
    const movingKnotFarRight = xDiff < -1
    const movingKnotFarDown = yDiff > 1
    const movingKnotFarUp = yDiff < -1
    const knotsInDifferentColumns = leadingKnot[1] !== movingKnot[1]
    const knotsInDifferentRows = leadingKnot[0] !== movingKnot[0]
    const movingKnotBelow = leadingKnot[1] > movingKnot[1]
    const movingKnotBehind = leadingKnot[0] > movingKnot[0]

    if (movingKnotFarLeft) {
      return knotsInDifferentColumns
        ? ['R', movingKnotBelow ? 'U' : 'D']
        : ['R']
    }

    if (movingKnotFarRight) {
      return knotsInDifferentColumns
        ? ['L', movingKnotBelow ? 'U' : 'D']
        : ['L']
    }

    if (movingKnotFarDown) {
      return knotsInDifferentRows ? ['U', movingKnotBehind ? 'R' : 'L'] : ['U']
    }

    if (movingKnotFarUp) {
      return knotsInDifferentRows ? ['D', movingKnotBehind ? 'R' : 'L'] : ['D']
    }

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

export const countLongTailPositions = (input: string): number => {
  const instructions = processInput(input)
  const grid = new Grid(8)
  instructions.forEach(({ direction, distance }) => {
    const [x, y] = convertDirectionToCoords([direction])
    Array.from({ length: distance }).forEach(() => {
      grid.move(GridItem.Head, x, y)
    })
  })
  return grid.tailVisits
}
