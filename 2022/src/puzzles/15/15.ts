import { sum } from '../../util'

class Point {
  constructor(public x: number, public y: number) {}

  match(point: Point): boolean {
    return point.x === this.x && point.y === this.y
  }

  distanceTo(point: Point): number {
    return Math.abs(point.x - this.x) + Math.abs(point.y - this.y)
  }
}

class Range {
  constructor(public x1: number, public x2: number) {}
  getLength(): number {
    return Math.abs(this.x2 - this.x1)
  }
}
class RangeList {
  public ranges: Range[]
  constructor() {
    this.ranges = []
  }

  consolidateOn(index: number) {
    const toConsolidate = this.ranges.filter((_, i) => i !== index)
    const consolidator = this.ranges[index]
    this.ranges = [consolidator]
    toConsolidate.forEach((range) => this.addRange(range))
  }

  addRange(range: Range) {
    let rangeAdded = false
    for (let i = 0; i < this.ranges.length; i++) {
      const x1Fits =
        range.x1 >= this.ranges[i].x1 && this.ranges[i].x2 >= range.x1
      const x2Fits =
        range.x2 >= this.ranges[i].x1 && this.ranges[i].x2 >= range.x2
      if (x1Fits && x2Fits) {
        rangeAdded = true
      }
      if (x1Fits && !x2Fits) {
        rangeAdded = true
        this.ranges[i].x2 = range.x2
      }
      if (!x1Fits && x2Fits) {
        rangeAdded = true
        this.ranges[i].x1 = range.x1
      }
      const isSuperRange =
        range.x1 < this.ranges[i].x1 && range.x2 > this.ranges[i].x2
      if (isSuperRange) {
        rangeAdded = true
        this.ranges[i].x1 = range.x1
        this.ranges[i].x2 = range.x2
      }
      if (rangeAdded) {
        this.consolidateOn(i)
        break
      }
    }
    if (!rangeAdded) this.ranges.push(range)
  }
}

class CaveObj {
  constructor(public point: Point) {}
}
class Beacon extends CaveObj {}

class Sensor extends CaveObj {
  range: number
  constructor(point: Point, public closestBeacon: Beacon) {
    super(point)
    this.range = point.distanceTo(closestBeacon.point)
  }
}

interface CaveReading {
  sensors: Sensor[]
  beacons: Beacon[]
}

const processInput = (input: string): CaveReading =>
  input
    .split('\n')
    .map((line) => {
      const getCoords = (coord: string) =>
        new Point(
          ...((coord.match(/^x=(.*), y=(.*)$/)?.slice(1, 3) ?? [0, 0]).map(
            (n) => Number(n)
          ) as [number, number])
        )
      const reading = line.split(': closest beacon is at ')
      const beacon = new Beacon(getCoords(reading[1]))
      const sensor = new Sensor(
        getCoords(reading[0].split('Sensor at ')[1]),
        beacon
      )
      return {
        sensor,
        beacon,
      }
    })
    .reduce<CaveReading>(
      (reading, current) => {
        const prexistingBeacon = reading.beacons.find((b) =>
          b.point.match(current.beacon.point)
        )
        if (prexistingBeacon) {
          current.sensor.closestBeacon = prexistingBeacon
          current.beacon = prexistingBeacon
          reading.sensors.push(current.sensor)
        } else {
          reading.sensors.push(current.sensor)
          reading.beacons.push(current.beacon)
        }
        return reading
      },
      { sensors: [] as Sensor[], beacons: [] as Beacon[] }
    )

export const countImpossibleBeaconLocations = (input: string, y: number) => {
  const { sensors } = processInput(input)
  const validSensors = sensors.filter(
    ({ point, range }) => !(point.y + range < y || point.y - range > y)
  )
  console.log(
    `${sensors.length} sensors. ${validSensors.length} sensors viable. `
  )
  const ranges = new RangeList()
  validSensors.forEach(({ point, range }) => {
    process.stdin.write('.')
    const triangleNumber = (n: number) => Math.abs(n) * 2 + 1
    const overlap = triangleNumber(range - Math.abs(point.y - y))
    const sideFill = (overlap - 1) / 2
    ranges.addRange(new Range(point.x - sideFill, point.x + sideFill))
  })
  return ranges.ranges.map((range) => range.getLength()).reduce(sum)
}
