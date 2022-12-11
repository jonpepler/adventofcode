import { getInput, printSolution } from '../../util'
import { findMonkeyInspections } from './11'

getInput(11).then((input) =>
  printSolution(findMonkeyInspections(input), undefined)
)
