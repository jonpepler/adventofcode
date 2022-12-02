import { fileToString, printSolution } from '../../util'
import { top3Calories, topCalories } from './1'

const input = fileToString('1')
printSolution(topCalories(input), top3Calories(input))
