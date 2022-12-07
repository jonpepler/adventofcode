import { getInput, printSolution } from '../../util'
import { findStartOfPacketIndex, findStartOfMessageIndex } from './6'

getInput(6).then((input) =>
  printSolution(findStartOfPacketIndex(input), findStartOfMessageIndex(input))
)
