import { getInput, printSolution } from '../../util'
import { countLongTailPositions, countTailPositions } from './9'

getInput(9).then((input) =>
  printSolution(countTailPositions(input), countLongTailPositions(input))
)
