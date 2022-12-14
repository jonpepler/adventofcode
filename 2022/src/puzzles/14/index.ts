import { getInput, printSolution } from '../../util'
import { countBottomedRestingSand, countRestingSand } from './14'

getInput(14).then((input) =>
  printSolution(countRestingSand(input), countBottomedRestingSand(input))
)
