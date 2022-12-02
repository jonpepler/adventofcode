import { fileToString, printSolution } from '../../util'
import { calculateScore, strategise } from './2'

const input = fileToString('2')
printSolution(calculateScore(input), strategise(input))
