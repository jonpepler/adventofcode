import fs from 'fs'

const input = fs
  .readFileSync('./src/data/1.txt')
  .toString()
  .split('\n')
  .map((str) => parseInt(str))

let increases = 0
let previous = input[0]
input.forEach((depth) => {
  if (depth > previous) increases++
  previous = depth
})

console.log('part 1: ', increases)

const increases2 = input
  .map((depth, index, arr) => {
    if (Boolean(arr[index + 1]) && Boolean(arr[index + 2])) {
      return depth + arr[index + 1] + arr[index + 2]
    }
    return undefined
  })
  .filter((v) => v !== undefined)
  .reduce<number>((acc, depth, index, arr) => {
    const previous = arr[index - 1]
    return previous != null
      ? acc + (depth != null && depth > previous ? 1 : 0)
      : acc
  }, 0)

console.log('part 2: ', increases2)
