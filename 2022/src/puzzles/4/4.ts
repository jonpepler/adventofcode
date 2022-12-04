import { sumTrue } from '../../util/'

type CleaningPair = number[][]

const processGroupPairs = (input: string): CleaningPair[] =>
  input
    .split('\n')
    .map((line) => line.split(','))
    .map((groups) =>
      groups.reduce<CleaningPair>((groupArr, range) => {
        const ranged = range.split('-').map((num) => Number(num))
        return [...groupArr, ranged]
      }, [])
    )

const hasOverlap = ([[lowerX, lowerY], [upperX, upperY]]: CleaningPair) =>
  (lowerX >= upperX && lowerY <= upperY) ||
  (upperX >= lowerX && upperY <= lowerY)

const hasAnyOverlap = ([[lowerX, lowerY], [upperX, upperY]]: CleaningPair) =>
  (lowerX >= upperX && lowerX <= upperY) ||
  (lowerY >= upperX && lowerY <= upperY) ||
  (upperX >= lowerX && upperX <= lowerY) ||
  (upperY >= lowerX && upperY <= lowerY)

export const countOverlappingSections = (input: string) =>
  processGroupPairs(input).map(hasOverlap).reduce<number>(sumTrue, 0)

export const countAllOverlappingSections = (input: string) =>
  processGroupPairs(input).map(hasAnyOverlap).reduce<number>(sumTrue, 0)
