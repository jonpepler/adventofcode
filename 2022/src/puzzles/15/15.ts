class Point {
  constructor(public x: number, public y: number) {}

  match(point: Point): boolean {
    return point.x === this.x && point.y === this.y
  }

  distanceTo(point: Point): number {
    return Math.abs(point.x - this.x) + Math.abs(point.y - this.y)
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
  const testLine: boolean[] = []
  let offset = 0
  const validSensors = sensors.filter(
    ({ point, range }) => !(point.y + range < y || point.y - range > y)
  )
  console.log(
    `${sensors.length} sensors. ${validSensors.length} sensors viable. `
  )
  validSensors.forEach(({ point, range }) => {
    process.stdin.write('.')
    const triangleNumber = (n: number) => Math.abs(n) * 2 + 1
    const overlap = triangleNumber(range - Math.abs(point.y - y))
    const sideFill = (overlap - 1) / 2
    testLine[point.x] = true
    for (let i = 1; i <= sideFill; i++) {
      if (point.x - i < 0) {
        offset++
        testLine.unshift(true)
        testLine[offset + point.x + i] = true
      } else {
        testLine[offset + point.x + i] = true
        testLine[offset + point.x - i] = true
      }
    }
  })
  process.stdin.write('\n')
  return testLine.filter((v) => v).length
}
