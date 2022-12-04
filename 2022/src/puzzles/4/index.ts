import { fileToString, printSolution } from '../../util'
import { countOverlappingSections } from './4'

const input = fileToString('4')
printSolution(countOverlappingSections(input), undefined)
