import { fileToString, sum } from '../util'

export enum Hands {
  Rock,
  Paper,
  Scissors,
}

enum Strategy {
  Lose,
  Draw,
  Win,
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

interface GameGuide {
  opponent: Hands
  player: Strategy
}

const guideMap = {
  X: Strategy.Lose,
  Y: Strategy.Draw,
  Z: Strategy.Win,
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

const processSrategyInput = (input: string): GameGuide[] =>
  input
    .split('\n')
    .map((game) => game.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z'])
    .map(([opponent, player]) => ({
      opponent: opponentMap[opponent],
      player: guideMap[player],
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

const getLosingHand = (hand: Hands) => {
  if (hand === Hands.Rock) return Hands.Scissors
  if (hand === Hands.Paper) return Hands.Rock
  return Hands.Paper
}

const getWinningHand = (hand: Hands) => {
  if (hand === Hands.Rock) return Hands.Paper
  if (hand === Hands.Paper) return Hands.Scissors
  return Hands.Rock
}

const chooseHand = (guide: GameGuide): Game => {
  if (guide.player === Strategy.Draw) {
    return { opponent: guide.opponent, player: guide.opponent }
  }
  if (guide.player === Strategy.Lose) {
    return { opponent: guide.opponent, player: getLosingHand(guide.opponent) }
  }
  return { opponent: guide.opponent, player: getWinningHand(guide.opponent) }
}

export const calculateScore = (input: string) =>
  processInput(input).map(resolveGame).reduce(sum)

export const strategise = (input: string) =>
  processSrategyInput(input).map(chooseHand).map(resolveGame).reduce(sum)

export const solution = () => strategise(fileToString('2'))
