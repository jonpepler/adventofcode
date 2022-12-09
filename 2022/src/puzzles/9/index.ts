import { getInput, printSolution } from '../../util'
import { countTailPositions } from './9'

getInput(9).then((input) => printSolution(countTailPositions(input), undefined))
