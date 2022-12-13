class Coord {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  distanceTo(b: Coord) {
    return Math.abs(this.x - b.x) + Math.abs(this.y - b.y)
  }
}

// Point: just value
// Coord: just location
// Node: both + path data
class Node {
  g: number
  location: Coord
  value: string
  // eslint-disable-next-line no-use-before-define
  parent: Node | null

  constructor(g: number, location: Coord, value: string, parent: Node | null) {
    this.g = g
    this.location = location
    this.value = value
    this.parent = parent
  }

  matchesCoord(c: Coord) {
    return this.location.distanceTo(c) === 0
  }

  backtrace(trace: Node[] = []): Node[] {
    if (this.parent === null) return [...trace, this]

    trace.push(this)
    return this.parent.backtrace(trace)
  }
}

class Map {
  map: string[][]
  constructor(map: string[][]) {
    this.map = map
  }

  private elevationChart = 'abcdefghijklmnopqrstuvwxyz'

  private getLetterCoord(letter: string): Coord {
    const y = this.map.findIndex((l) => l.join('').includes(letter))
    const x = this.map[y].findIndex((n) => n === letter)
    return new Coord(x, y)
  }

  getStartCoord(): Coord {
    return this.getLetterCoord('S')
  }

  getEndCoord(): Coord {
    return this.getLetterCoord('E')
  }

  reachable(from: string, to: string): boolean {
    const fromIdx = this.elevationChart.indexOf(from === 'S' ? 'a' : from)
    const toIdx = this.elevationChart.indexOf(to === 'E' ? 'z' : to)
    return toIdx <= fromIdx + 1
  }

  getAdjacentPoints(n: Node): Node[] {
    const { x, y } = n.location
    return [
      { x: x + 1, y },
      { x: x - 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ]
      .map((coord) => ({ ...coord, v: this.map[coord.y]?.[coord.x] }))
      .filter((x) => x.v !== undefined && this.reachable(n.value, x.v))
      .map((aN) => {
        if (aN.v === undefined) return undefined

        const coord = new Coord(aN.x, aN.y)
        return new Node(n.g + 1, coord, aN.v, n)
      }) as Node[]
  }

  getPointsWithValue(value: string): Coord[] {
    const indexes: Coord[] = []
    this.map.forEach((line, y) => {
      line.forEach((v, x) => {
        if (v === value) indexes.push(new Coord(x, y))
      })
    })
    return indexes
  }
}

class Searcher {
  private visitedList: Node[] = []
  private nodeList: Node[] = []
  constructor(private map: Map, private chooseStartingPoint = false) {}

  private mapDrawn = false

  drawMap(currentLoc: Coord) {
    if (process.env.NODE_ENV === 'test') return
    if (!this.mapDrawn) {
      console.clear()
      this.mapDrawn = true
      process.stdout.cursorTo(0, 2)
      process.stdout.write(
        this.map.map.map((l) => l.join('')).join('\n') + '\n'
      )
    }

    process.stdout.cursorTo(0, 1)
    process.stdout.write(
      `Visited:\t${this.visitedList.length}\tOpen:\t${this.nodeList.length}`
    )

    process.stdout.cursorTo(currentLoc.x, currentLoc.y + 2)
    process.stdout.write(
      '\x1b[32m' + this.map.map[currentLoc.y][currentLoc.x] + '\x1b[0m'
    )
  }

  drawBacktrace(backtrace: Node[]) {
    if (process.env.NODE_ENV === 'test') return
    backtrace.forEach((n) => {
      process.stdout.cursorTo(n.location.x, n.location.y + 2)
      process.stdout.write(
        '\x1b[34m' + this.map.map[n.location.y][n.location.x] + '\x1b[0m'
      )
    })
    process.stdout.cursorTo(0, this.map.map.length + 2)
  }

  findPath() {
    if (!this.chooseStartingPoint) {
      const startCoord = this.map.getStartCoord()
      const startNode = new Node(0, startCoord, 'S', null)
      this.nodeList.push(startNode)
    } else {
      const startCoords = [
        ...this.map.getPointsWithValue('a'),
        this.map.getStartCoord(),
      ].map((c) => new Node(0, c, 'a', null))
      this.nodeList.push(...startCoords)
    }

    let pathFound = false
    let currentNode: Node | undefined
    while (!pathFound) {
      // choose node with lowest cost
      currentNode = this.nodeList.sort((a, b) => a.g - b.g).shift()
      if (currentNode === undefined)
        throw new Error('Ran out of nodes to look at...')

      pathFound = this.searchLoop(currentNode)
      this.visitedList.push(currentNode)
      this.drawMap(currentNode.location)
    }
    if (currentNode === undefined)
      throw new Error('Ran out of nodes to look at...')
    const backtrace = currentNode.backtrace()
    this.drawBacktrace(backtrace)
    return backtrace
  }

  private searchLoop(currentNode: Node): boolean {
    // exit if end node
    if (currentNode.matchesCoord(this.map.getEndCoord())) return true
    // get adjacent nodes
    // score them, add them to list as child nodes of current
    // if any are in visited, check costs and update if necessary
    const newNodes = this.map.getAdjacentPoints(currentNode)
    newNodes.forEach((n) => {
      const alreadyVisited = this.visitedList.find((vN) =>
        vN.matchesCoord(n.location)
      )
      if (alreadyVisited) {
        if (alreadyVisited.g > n.g) {
          alreadyVisited.g = n.g
          alreadyVisited.parent = currentNode
        }
      } else {
        if (
          this.nodeList.find((nL) => nL.matchesCoord(n.location)) === undefined
        ) {
          const visited = this.visitedList.find((nL) =>
            nL.matchesCoord(n.location)
          )
          if ((visited && visited.g > n.g) || visited === undefined) {
            this.nodeList.push(n)
          }
        }
      }
    })

    return false
  }
}

const processInput = (input: string) =>
  new Map(input.split('\n').map((n) => n.split('')))

export const findShortestPath = (input: string) => {
  const map = processInput(input)
  const searcher = new Searcher(map)
    .findPath()
    ?.reverse()
    .map((n) => n.location)

  return searcher.length - 1
}

export const findShortestPathWithMultipleStartingPoints = (input: string) => {
  const map = processInput(input)
  const searcher = new Searcher(map, true)
    .findPath()
    ?.reverse()
    .map((n) => n.location)

  return searcher.length - 1
}
