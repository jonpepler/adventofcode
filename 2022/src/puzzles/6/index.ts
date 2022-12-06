import { fileToString, printSolution } from '../../util'
import { charsToStart, findStartOfMessageIndex } from './6'

const input = fileToString('6')
printSolution(charsToStart(input), findStartOfMessageIndex(input))
