import { fileToString, printSolution } from '../../util'
import { getTop9001Crates, getTopCrates } from './5'

const input = fileToString('5')
printSolution(getTopCrates(input), getTop9001Crates(input))
