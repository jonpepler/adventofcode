import { getInput, printSolution } from '../../util'
import { findSignalStrength, renderScreen } from './10'

getInput(10).then((input) => {
  printSolution(findSignalStrength(input), 'see below :)')
  console.log(renderScreen(input))
})
