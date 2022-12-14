import { getInput, printSolution } from '../../util'
import { countCorrectSignals, sortSignal } from './13'

getInput(13).then((input) =>
  printSolution(countCorrectSignals(input), sortSignal(input))
)
