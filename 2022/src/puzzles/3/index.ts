import { fileToString, printSolution } from '../../util'
import { getBadgeGroups, getItemPriorities } from './3'

const input = fileToString('3')
printSolution(getItemPriorities(input), getBadgeGroups(input))
