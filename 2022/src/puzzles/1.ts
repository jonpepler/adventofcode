import { readFileSync } from 'fs'
import path from 'path'

const totalCalories = (total: number, calories: number) => total + calories

const processTotalsFromInput = (input: string): number[] =>
  input.split('\n\n').map((elf) =>
    elf
      .split('\n')
      .map((calories) => Number(calories))
      .reduce(totalCalories)
  )

export const topCalories = (input: string) =>
  Math.max(...processTotalsFromInput(input))

export const top3Calories = (input: string) => {
  return processTotalsFromInput(input)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(totalCalories)
}

export const solution = () => {
  const input = readFileSync(
    path.resolve(__dirname, '1')
  ).toString()

  return top3Calories(input)
}
