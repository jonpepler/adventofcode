import { fileToString } from '../../util'
import { getBadgeGroups, getItemPriorities, halveBags, prioritise } from './3'

it('returns 157 for part 1 puzzle input', () => {
  const input = fileToString('3.test')
  const output = getItemPriorities(input)
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

it('returns 70 for part 2 puzzle input', () => {
  const input = fileToString('3.test')
  const output = getBadgeGroups(input)
  expect(output).toEqual(70)
})
