import { getInput, printSolution } from '../../util'
import { countVisibleTrees, findScenicSpot } from './8'

getInput(8).then((input) =>
  printSolution(countVisibleTrees(input), findScenicSpot(input))
)
