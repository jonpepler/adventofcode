enum CavePart {
  Sand = 'o',
  Air = '.',
  Rock = '#',
}
type Cave = CavePart[][]

let lowestPartX: number
let furthestPartX: number
let lowestPartY: number
let furthestPartY: number
const adjustCoord = (
  coord: [number, number],
  lowestX: number,
  lowestY: number
): [number, number] => [coord[0] - lowestX, coord[1] - lowestY]

const processInput = (input: string, addBottom = false): Cave => {
  const values = input
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((coord) => coord.split(',').map((n) => Number(n)))
    )
    .flat()

  lowestPartX = Math.min(...values.map((x) => x[0])) - 450
  furthestPartX = Math.max(...values.map((x) => x[0])) + 450
  lowestPartY = Math.min(...values.map((x) => x[1])) - 15
  const yEnd = Math.max(...values.map((x) => x[1]))
  furthestPartY = yEnd + 15

  const cave = (Array(furthestPartY - lowestPartY) as Cave)
    .fill(Array(furthestPartX - lowestPartX))
    .map((y) => y.fill(CavePart.Air).map(() => CavePart.Air)) // get separate array instances
  console.log('!!', yEnd)

  if (addBottom)
    cave[adjustCoord([0, yEnd + 2], lowestPartX, lowestPartY)[1]] = cave[
      adjustCoord([0, yEnd + 2], lowestPartX, lowestPartY)[1]
    ].map(() => CavePart.Rock)

  input.split('\n').forEach((line) => {
    const points = line
      .split(' -> ')
      .map((coord) => coord.split(',').map((n) => Number(n)))
    for (let i = 0; i < points.length - 1; i++) {
      const [from, to] = [
        adjustCoord(points[i] as [number, number], lowestPartX, lowestPartY),
        adjustCoord(
          points[i + 1] as [number, number],
          lowestPartX,
          lowestPartY
        ),
      ]
      if (from[0] === to[0]) {
        const down = from[1] - to[1] > 0
        for (
          let j = from[1];
          down ? j >= to[1] : j <= to[1];
          down ? j-- : j++
        ) {
          cave[j][from[0]] = CavePart.Rock
        }
      }
      if (from[1] === to[1]) {
        const downX = from[0] - to[0] > 0
        for (
          let j = from[0];
          downX ? j >= to[0] : j <= to[0];
          downX ? j-- : j++
        ) {
          cave[from[1]][j] = CavePart.Rock
        }
      }
    }
  })
  return cave
}

const printCave = (cave: Cave) => {
  let write = ''
  cave.forEach((caveLine) => {
    caveLine.forEach((cavePart) => {
      write += cavePart
    })
    write += '\n'
  })
  return write
}

const addSand = (cave: Cave): number => {
  const sandSource = adjustCoord([500, 0], lowestPartX, lowestPartY)
  if (cave[sandSource[1]][sandSource[0]] !== CavePart.Air) return -2
  cave[sandSource[1]][sandSource[0]] = CavePart.Sand
  const canMove = (x: number, y: number): number => {
    // if all space below sand is air
    if (
      cave
        .slice(y + 1)
        .map((i) => i[x])
        .every((i) => i === CavePart.Air)
    )
      return -2
    if (cave[y + 1]?.[x] === CavePart.Air) return 0
    if (cave[y + 1]?.[x - 1] === CavePart.Air) return -1
    if (cave[y + 1]?.[x + 1] === CavePart.Air) return +1
    return 2
  }
  let sandCoord = [sandSource[0], sandSource[1]]
  let movementOption = canMove(sandCoord[0], sandCoord[1])
  while (Math.abs(movementOption) !== 2) {
    cave[sandCoord[1]][sandCoord[0]] = CavePart.Air
    if (movementOption === 0) {
      cave[sandCoord[1] + 1][sandCoord[0]] = CavePart.Sand
      sandCoord = [sandCoord[0], sandCoord[1] + 1]
    }
    if (movementOption === -1) {
      cave[sandCoord[1] + 1][sandCoord[0] - 1] = CavePart.Sand
      sandCoord = [sandCoord[0] - 1, sandCoord[1] + 1]
    }
    if (movementOption === 1) {
      cave[sandCoord[1] + 1][sandCoord[0] + 1] = CavePart.Sand
      sandCoord = [sandCoord[0] + 1, sandCoord[1] + 1]
    }

    movementOption = canMove(sandCoord[0], sandCoord[1])
    if (movementOption === -2) cave[sandCoord[1]][sandCoord[0]] = CavePart.Air
  }
  return movementOption
}

export const countRestingSand = (input: string) => {
  const cave = processInput(input)
  console.log(printCave(cave))
  let sandResult = addSand(cave)
  let sandCount = 0
  while (sandResult !== -2) {
    sandCount++
    sandResult = addSand(cave)
  }
  console.log(printCave(cave))
  return sandCount
}

export const countBottomedRestingSand = (input: string) => {
  const cave = processInput(input, true)
  console.log(printCave(cave))
  let sandResult = addSand(cave)
  let sandCount = 0
  while (sandResult !== -2) {
    sandCount++
    sandResult = addSand(cave)
  }
  console.log(printCave(cave))
  return sandCount
}
