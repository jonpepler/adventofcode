type Signal = number | Array<Signal>

const printStep = (a: Signal, b: Signal, indent: number) =>
  '  '.repeat(indent) +
  `- Compare ${JSON.stringify(a)} vs ${JSON.stringify(b)}\n`

const compare = (
  a: Signal,
  b: Signal,
  indent = 0,
  write = ''
): [number, string] => {
  const aIsArray = Array.isArray(a)
  const bIsArray = Array.isArray(b)

  if (!aIsArray && !bIsArray) {
    const result = b - a

    return [result, write]
  }

  const mixedTypesMessage = 'Mixed types; convert '
  const mixedTypesSuffix = ' and retry comparison\n'
  const mixedString = '  '.repeat(indent) + `- `
  if (!aIsArray && bIsArray) {
    write +=
      mixedString +
      mixedTypesMessage +
      'left to ' +
      JSON.stringify([a]) +
      mixedTypesSuffix
    write += printStep([a], b, indent)
    return compare([a], b, indent + 1, write)
  }

  if (aIsArray && !bIsArray) {
    write +=
      mixedString +
      mixedTypesMessage +
      'right to ' +
      JSON.stringify([b]) +
      mixedTypesSuffix
    write += printStep(a, [b], indent + 1)
    return compare(a, [b], indent + 1, write)
  }

  // both are arrays
  if (aIsArray && bIsArray) {
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      write += printStep(a[i], b[i], indent + 1)
      const result = compare(a[i], b[i], indent + 1, write)
      if (result[0] !== 0) return result
    }

    // one of the arrays ran out of elements, find which
    return [b.length - a.length, write]
  }
  throw new Error('shrugman')
}

export const processInput = (input: string) =>
  input.split('\n\n').map((pair) => pair.split('\n').map((x) => JSON.parse(x)))

export const countCorrectSignals = (input: string): number => {
  const pairs = processInput(input)
  return pairs.reduce((sum, pair, i) => {
    const result = compare(pair[0], pair[1])
    console.log(`Value: ${result[0]}\n== Part ${i + 1} ==\n` + result[1])
    return sum + (result[0] < 0 ? 0 : i + 1)
  }, 0)
}

export const processPart2Input = (input: string) => {
  const out = [[[2]], [[6]]]
  input.split('\n\n').forEach((pair) => {
    out.push(...pair.split('\n').map((x) => JSON.parse(x)))
  })
  return out
}
export const sortSignal = (input: string) => {
  const signals = processPart2Input(input)
    .sort((a, b) => compare(a, b)[0])
    .reverse()
  const findDividerSignal = (v: number) =>
    signals.findIndex(
      (s) =>
        Array.isArray(s) &&
        Array.isArray(s[0]) &&
        s.length === 1 &&
        s[0].length === 1 &&
        s[0][0] === v
    ) + 1
  const six = findDividerSignal(6)
  const two = findDividerSignal(2)
  return two * six
}
