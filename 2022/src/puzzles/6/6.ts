const datastream = function* (stream: string, blocksize: number) {
  let index = -1

  while (stream.length - 1 >= index) {
    index++
    if (stream[index + blocksize - 1] === undefined) yield undefined
    else
      yield Array.from({ length: blocksize }).map((_, i) => stream[index + i])
  }
}

const findUniqueBlockIndex = (input: string, blocksize: number): number => {
  const stream = datastream(input, blocksize)
  let index = 0
  for (const block of stream) {
    index++
    const set = new Set(block)
    if (set.size === blocksize) return index + blocksize - 1
  }
  throw new Error(
    'Subroutine reached index ' + index + ' without seeing a unique block!'
  )
}

export const findStartOfPacketIndex = (input: string): number =>
  findUniqueBlockIndex(input, 4)

export const findStartOfMessageIndex = (input: string): number =>
  findUniqueBlockIndex(input, 14)
