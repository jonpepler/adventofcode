import fs from 'fs'

const input = fs.readFileSync('./src/data/3.txt').toString().split('\n')
const getColumn = (rows: string[], column: number): string[] =>
  rows.map((v) => v[column])
const getMostFrequentBit = (column: string[]): 0 | 1 => {
  const frequencies = column.reduce(
    (acc, bit) =>
      bit === '0' ? { 1: acc[1], 0: acc[0] + 1 } : { 1: acc[1] + 1, 0: acc[0] },
    { 0: 0, 1: 0 }
  )

  return frequencies[0] > frequencies[1] ? 0 : 1
}
const invertBit = (bit: 0 | 1): 1 | 0 => (bit === 0 ? 1 : 0)
const invertBinary = (bits: Array<0 | 1>): Array<1 | 0> =>
  bits.map((b) => invertBit(b))

const gammaBinary = input[0]
  .split('')
  .map((_, index) => getMostFrequentBit(getColumn(input, index)))
const epsilonBinary = invertBinary(gammaBinary)

const gamma = parseInt(gammaBinary.join(''), 2)
const epsilon = parseInt(epsilonBinary.join(''), 2)

console.log('Power Consumption:', gamma * epsilon)
