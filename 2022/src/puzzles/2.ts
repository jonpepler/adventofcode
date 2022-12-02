import { fileToString, sum } from '../util'

export enum Hands {
  Rock,
  Paper,
  Scissors,
}

const opponentMap = {
  A: Hands.Rock,
  B: Hands.Paper,
  C: Hands.Scissors,
}

const playerMap = {
  X: Hands.Rock,
  Y: Hands.Paper,
  Z: Hands.Scissors,
}

interface Game {
  opponent: Hands
  player: Hands
}

const gameResults = {
  loss: 0,
  draw: 3,
  win: 6,
}

const processInput = (input: string): Game[] =>
  input
    .split('\n')
    .map((game) => game.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'])
    .map(([opponent, player]) => ({
      opponent: opponentMap[opponent],
      player: playerMap[player],
    }))

export const resolveGame = (game: Game): number => {
  // cheat using enum values
  const baseScore = game.player + 1

  if (game.player === game.opponent) {
    return baseScore + gameResults.draw
  }

  if (game.player === Hands.Rock) {
    return baseScore + (game.opponent === Hands.Scissors ? 6 : 0)
  }

  if (game.player === Hands.Paper) {
    return baseScore + (game.opponent === Hands.Rock ? 6 : 0)
  }

  return baseScore + (game.opponent === Hands.Paper ? 6 : 0)
}

export const calculateScore = (input: string) =>
  processInput(input)
    .map((game) => resolveGame(game))
    .reduce(sum)

export const solution = () => calculateScore(fileToString('2'))
