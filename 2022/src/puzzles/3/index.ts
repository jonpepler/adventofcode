import { getInput, printSolution } from '../../util'
import { getBadgeGroups, getItemPriorities } from './3'

getInput(3).then((input) =>
  printSolution(getItemPriorities(input), getBadgeGroups(input))
)
