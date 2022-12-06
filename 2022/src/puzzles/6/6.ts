const datastream = function* (input: string) {
  let index = 0
  const stream = input

  while (stream.length - 1 >= index) {
    if (stream[index + 3] === undefined) yield undefined
    else
      yield [
        stream[index],
        stream[index + 1],
        stream[index + 2],
        stream[index + 3],
      ]

    index++
  }
}

export const charsToStart = (input: string): number => {
  const stream = datastream(input)
  let index = 0
  for (const block of stream) {
    index++
    const set = new Set(block)
    if (set.size === 4) return index + 3
  }
  throw new Error(
    'Subroutine reached index ' + index + ' without seeing a unique block!'
  )
}
