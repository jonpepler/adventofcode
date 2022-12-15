import { getInput, printSolution } from '../../util'
import { countImpossibleBeaconLocations, findBeaconTuningFrequency } from './15'

getInput(15).then((input) =>
  printSolution(
    countImpossibleBeaconLocations(input, 2000000),
    findBeaconTuningFrequency(input, 4000000)
  )
)
