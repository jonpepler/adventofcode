import { getInput, printSolution } from '../../util'
import { top3Calories, topCalories } from './1'

getInput(1).then((input) =>
  printSolution(topCalories(input), top3Calories(input))
)
