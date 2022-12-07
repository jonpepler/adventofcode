import { getInput, printSolution } from '../../util'
import { calculateScore, strategise } from './2'

getInput(2).then((input) =>
  printSolution(calculateScore(input), strategise(input))
)
