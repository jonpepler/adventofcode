import { getInput, printSolution } from '../../util'
import {
  findShortestPath,
  findShortestPathWithMultipleStartingPoints,
} from './12'

getInput(12).then((input) =>
  printSolution(
    findShortestPath(input),
    findShortestPathWithMultipleStartingPoints(input)
  )
)
