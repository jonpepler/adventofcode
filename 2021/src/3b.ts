import fs from 'fs'

type Bits = Array<0 | 1>

const input: Bits[] = fs
  .readFileSync('./src/data/3.txt')
  .toString()
  .split('\n')
  .map((str) => str.split('').map((c) => (parseInt(c) === 0 ? 0 : 1)))

const getMostFrequentBit = (column: Bits): 0 | 1 => {
  const frequencies = column.reduce(
    (acc, bit) =>
      bit === 0 ? { 1: acc[1], 0: acc[0] + 1 } : { 1: acc[1] + 1, 0: acc[0] },
    { 0: 0, 1: 0 }
  )

  return frequencies[0] > frequencies[1] ? 0 : 1
}

const getLeastFrequentBit = (column: Bits): 0 | 1 => {
  const frequencies = column.reduce(
    (acc, bit) =>
      bit === 0 ? { 1: acc[1], 0: acc[0] + 1 } : { 1: acc[1] + 1, 0: acc[0] },
    { 0: 0, 1: 0 }
  )

  return frequencies[0] > frequencies[1] ? 1 : 0
}

const getColumn = (bits: Bits[], column: number): Bits =>
  bits.map((v) => v[column])

const filterHighestFreqFirstBit = (bits: Bits[], index = 0): Bits => {
  if (bits.length === 1) return bits[0]
  const indexColumn = getColumn(bits, index)
  const mostFrequentBit = getMostFrequentBit(indexColumn)
  const filteredBits = bits.filter((b) => b[index] === mostFrequentBit)
  return filterHighestFreqFirstBit(filteredBits, index + 1)
}

const filterLowestFreqFirstBit = (bits: Bits[], index = 0): Bits => {
  if (bits.length === 1) return bits[0]
  const indexColumn = getColumn(bits, index)
  const mostFrequentBit = getLeastFrequentBit(indexColumn)
  const filteredBits = bits.filter((b) => b[index] === mostFrequentBit)
  return filterLowestFreqFirstBit(filteredBits, index + 1)
}

const binaryToDecimal = (bits: Bits): number => parseInt(bits.join(''), 2)

const oxygen = binaryToDecimal(filterHighestFreqFirstBit(input))
const co2 = binaryToDecimal(filterLowestFreqFirstBit(input))
console.log('Oxygen:', oxygen)
console.log('CO2:', co2)
console.log('Life Support Rating:', oxygen * co2)
