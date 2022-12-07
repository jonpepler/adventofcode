import { getInput, printSolution } from '../../util'
import { getDeletableDirectory, getDirectorySizes } from './7'

getInput(7).then((input) =>
  printSolution(getDirectorySizes(input), getDeletableDirectory(input))
)
