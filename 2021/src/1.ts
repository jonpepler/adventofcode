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

console.log(increases)
