import { fileToString } from '../../util'
import { getItemPriorities, halveBags, prioritise } from './3'

it('returns 157 for part 1 puzzle input', () => {
  const input = fileToString('3.test')
  const output = getItemPriorities(input)
  console.log(output)
  expect(output).toEqual(157)
})

describe('bag halving', () => {
  it('correctly splits small bags into two halves', () => {
    const input = 'aa'
    expect(halveBags(input)).toEqual([['a'], ['a']])
  })

  it('correctly splits big bags into two halves', () => {
    const input = 'abcdefghijabcdefghij'
    expect(halveBags(input)).toEqual([
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    ])
  })
})

it('gets the correct prioritisation for each letter', () => {
  expect(prioritise('a')).toEqual(1)
  expect(prioritise('A')).toEqual(27)
  expect(prioritise('Z')).toEqual(52)
})
