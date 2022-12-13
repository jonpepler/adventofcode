import { getInput, printSolution } from '../../util'
import { findMonkeyInspections, findWorriedMonkeyInspections } from './11'

getInput(11).then((input) =>
  printSolution(
    findMonkeyInspections(input),
    findWorriedMonkeyInspections(input)
  )
)
