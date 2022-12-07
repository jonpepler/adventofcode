import { fileToString, printSolution } from '../../util'
import { getDirectorySizes } from './7'

const input = fileToString('7')
printSolution(getDirectorySizes(input), undefined)
