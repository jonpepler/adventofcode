import { sum } from '../../util'

export const halveBags = (bag: string): string[][] => {
  const items = bag.split('')
  return [items.slice(0, items.length / 2), items.slice(items.length / 2)]
}

export const getRepeatedItem = (bagHalves: string[][]): string => {
  const repeatedItem = bagHalves[0].find((item) => bagHalves[1].includes(item))
  if (repeatedItem === undefined)
    throw new Error("Couldn't find a repeated item in " + bagHalves)

  return repeatedItem
}

export const prioritise = (item: string): number => {
  if (item === item.toUpperCase()) return item.charCodeAt(0) - 38
  return item.charCodeAt(0) - 96
}

export const getItemPriorities = (input: string) =>
  input
    .split('\n')
    .map(halveBags)
    .map(getRepeatedItem)
    .map(prioritise)
    .reduce(sum)
