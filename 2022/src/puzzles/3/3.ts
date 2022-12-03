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

const itemise = (bag: string): string[] => bag.split('')

const chunk = (chunks: string[][][], bag: string[]): string[][][] => {
  const currentGroup = chunks[chunks.length - 1]
  if (currentGroup !== undefined && currentGroup.length < 3) {
    currentGroup.push(bag)
    return chunks
  }
  chunks.push([bag])
  return chunks
}

const getBadge = (group: string[][]): string => {
  const badge = group[0].find(
    (badge) => group[1].includes(badge) && group[2].includes(badge)
  )
  if (badge === undefined)
    throw new Error("Couldn't find a badge item in " + group)

  return badge
}

export const getItemPriorities = (input: string) =>
  input
    .split('\n')
    .map(halveBags)
    .map(getRepeatedItem)
    .map(prioritise)
    .reduce(sum)

export const getBadgeGroups = (input: string) =>
  input
    .split('\n')
    .map(itemise)
    .reduce<string[][][]>(chunk, [])
    .map(getBadge)
    .map(prioritise)
    .reduce(sum)
