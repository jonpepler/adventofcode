import { fileToString } from '../util'
import { calculateScore, Hands, resolveGame } from './2'

it('returns 15 for part 1 test input', () => {
  expect(calculateScore(fileToString('2.test'))).toEqual(15)
})

describe('Game Resolve', () => {
  test('Paper beats rock', () => {
    expect(resolveGame({ opponent: Hands.Rock, player: Hands.Paper })).toEqual(
      6 + 2
    )
  })

  test('Rock beats Scissors', () => {
    expect(
      resolveGame({ opponent: Hands.Scissors, player: Hands.Rock })
    ).toEqual(6 + 1)
  })

  test('Scissors beats paper', () => {
    expect(
      resolveGame({ opponent: Hands.Paper, player: Hands.Scissors })
    ).toEqual(6 + 3)
  })

  it('draws when when players make the same hand', () => {
    expect(resolveGame({ opponent: Hands.Rock, player: Hands.Rock })).toEqual(
      3 + 1
    )
    expect(resolveGame({ opponent: Hands.Paper, player: Hands.Paper })).toEqual(
      3 + 2
    )
    expect(
      resolveGame({ opponent: Hands.Scissors, player: Hands.Scissors })
    ).toEqual(3 + 3)
  })
})
