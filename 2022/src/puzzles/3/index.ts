import { fileToString, printSolution } from '../../util'
import { getItemPriorities } from './3'

const input = fileToString('3')
printSolution(getItemPriorities(input), undefined)
