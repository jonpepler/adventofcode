import { getInput, printSolution } from '../../util'
import { countAllOverlappingSections, countOverlappingSections } from './4'

getInput(4).then((input) =>
  printSolution(
    countOverlappingSections(input),
    countAllOverlappingSections(input)
  )
)
