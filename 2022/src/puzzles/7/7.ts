import { sum } from '../../util'

interface File {
  name: string
  size: number
}

interface Directory {
  name: string
  contents: (File | Directory)[]
  parent: Directory | null
  totalSize?: number
}

export const addNodeToContents = (
  node: Directory,
  currentNode: Directory,
  moveTo = false
): Directory => {
  if (!currentNode.contents.find((n) => n.name === node.name))
    currentNode.contents.push(node)
  return moveTo ? node : currentNode
}

export const processContent = (
  line: string,
  currentNode: Directory
): Directory => {
  if (line.slice(0, 3) === 'dir') {
    return addNodeToContents(
      { name: line.slice(4), contents: [], parent: currentNode },
      currentNode
    )
  } else {
    const [size, name] = (line.match(/([0-9]+) (.*)/) ?? []).slice(1)
    currentNode.contents.push({ size: Number(size), name })

    return currentNode
  }
}

const isFile = (node: any): node is File => node.size !== undefined

export const printNode = (node: File | Directory, indent = 0, output = '') => {
  output +=
    ' '.repeat(indent * 2) +
    ` - ${node.name} ${isFile(node) ? `(file, size=${node.size})` : '(dir)'}\n`

  if (!isFile(node)) {
    const out = node.contents.map((n) => printNode(n, indent + 1))
    output += out.join('')
  }

  return output
}

export const processInput = (input: string): Directory => {
  const lines = input.split('\n').slice(1) // assume start in root node
  let currentNode: Directory = { name: '/', contents: [], parent: null }
  const rootNode = currentNode
  let lastCommand = ''
  lines.forEach((line) => {
    if (line[0] === '$') {
      lastCommand = line.slice(2)
      if (lastCommand.slice(0, 2) === 'cd') {
        const directory = lastCommand.slice(3)
        if (directory !== '..') {
          const nextNode = currentNode.contents.find(
            (n) => n.name === directory
          )
          if (nextNode === undefined)
            throw new Error('Unable to cd to ' + directory + '!')
          if (isFile(nextNode)) throw new Error(directory + ' is a file!')
          currentNode = nextNode
        } else {
          if (currentNode.parent === null)
            throw new Error('Cannot go above root folder!')
          currentNode = currentNode.parent
        }
      }
      // cmd: ls
    } else {
      currentNode = processContent(line, currentNode)
    }
  })

  return rootNode
}

const addTotalSize = (node: Directory): Required<Directory> => {
  node.totalSize = node.contents
    .map((n) => (isFile(n) ? n.size : addTotalSize(n).totalSize || 0))
    .reduce(sum)
  return guarenteeTotalSize(node)
}

const guarenteeTotalSize = (node: Directory): Required<Directory> => {
  if (node.totalSize === undefined)
    throw new Error('Missing total size! ' + node.name)
  else {
    return node as Required<Directory>
  }
}
interface SizeReport {
  size: number
  name: string
}
const findValidSizes = (
  node: Required<Directory>,
  sizes: SizeReport[] = []
): SizeReport[] => {
  sizes.push({ size: node.totalSize, name: node.name })

  node.contents.forEach((n) => {
    if (!isFile(n)) {
      sizes.push(...findValidSizes(guarenteeTotalSize(n)))
    }
  })

  return sizes
}

export const getDirectorySizes = (input: string) =>
  findValidSizes(addTotalSize(processInput(input)))
    .map((sr) => sr.size)
    .filter((size) => size < 100000)
    .reduce(sum)

const totalDiskSpace = 70000000
const targetSpace = 30000000
export const getDeletableDirectory = (input: string) => {
  const root = addTotalSize(processInput(input))
  const sizes = findValidSizes(root)
  const availableSpace = totalDiskSpace - root.totalSize
  const requiredSpace = targetSpace - availableSpace
  return sizes
    .filter(({ size }) => size >= requiredSpace)
    .sort(({ size: a }, { size: b }) => a - b)[0]
}
