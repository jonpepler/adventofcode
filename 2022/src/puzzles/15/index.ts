import { getInput, printSolution } from '../../util'
import { countImpossibleBeaconLocations } from './15'

getInput(15).then((input) =>
  printSolution(countImpossibleBeaconLocations(input, 2000000), undefined)
)
