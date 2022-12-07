import { fileToString, printSolution } from '../../util'
import { getDeletableDirectory, getDirectorySizes } from './7'

const input = fileToString('7')
printSolution(getDirectorySizes(input), getDeletableDirectory(input))
