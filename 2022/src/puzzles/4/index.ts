import { fileToString, printSolution } from '../../util'
import { countAllOverlappingSections, countOverlappingSections } from './4'

const input = fileToString('4')
printSolution(
  countOverlappingSections(input),
  countAllOverlappingSections(input)
)
