import { getInput, printSolution } from '../../util'
import { getTop9001Crates, getTopCrates } from './5'

getInput(5).then((input) =>
  printSolution(getTopCrates(input), getTop9001Crates(input))
)
