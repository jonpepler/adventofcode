import { sum } from '../../util'

enum TreeVisible {
  Unknown,
  Visible,
  Invisible,
}
export interface Tree {
  height: number
  visible: TreeVisible
  viewDistance: number
}
type Forest = Tree[][]

const processInput = (input: string): Forest =>
  input.split('\n').map((line) =>
    line.split('').map((h) => ({
      height: Number(h),
      visible: TreeVisible.Unknown,
      viewDistance: 0,
    }))
  )

const getVisibilityOnSubLine = (height: number, treeLine: Tree[]): boolean => {
  let index = 0
  while (index < treeLine.length) {
    if (treeLine[index].height >= height) return false
    index++
  }
  return true
}

const getVisibilityOnLine = (treeLine: Tree[]): Tree[] =>
  treeLine.map((tree, index, trees) => {
    const height = tree.height
    return {
      ...tree,
      visible:
        index === 0 ||
        index === trees.length - 1 ||
        getVisibilityOnSubLine(height, trees.slice(0, index).reverse()) ||
        getVisibilityOnSubLine(height, trees.slice(index + 1))
          ? TreeVisible.Visible
          : TreeVisible.Invisible,
    }
  })

const mergeVisibilityMaps = (map1: Forest, map2: Forest): Forest =>
  map1.map((treeLine, vIndex) =>
    treeLine.map((tree, hIndex) => {
      const map2Visibility = map2[hIndex][vIndex].visible
      return {
        ...tree,
        visible:
          tree.visible === TreeVisible.Visible ||
          map2Visibility === TreeVisible.Visible
            ? TreeVisible.Visible
            : TreeVisible.Invisible,
      }
    })
  )

const getVisibility = (trees: Forest): Forest => {
  const transposedTrees = trees[0].map((_, colIndex) =>
    trees.map((row) => row[colIndex])
  )

  const vMap = trees.map((treeLine) => getVisibilityOnLine(treeLine))
  const hMap = transposedTrees.map((treeLine) => getVisibilityOnLine(treeLine))
  return mergeVisibilityMaps(vMap, hMap)
}

export const getViewDistance = (height: number, treeLine: Tree[]): number => {
  let index = 0
  while (index < treeLine.length) {
    if (treeLine[index].height >= height) return index + 1
    index++
  }
  return index
}

export const countVisibleTrees = (input: string) =>
  getVisibility(processInput(input))
    .map((treeLine) =>
      treeLine.reduce(
        (total, tree) => total + (tree.visible === TreeVisible.Visible ? 1 : 0),
        0
      )
    )
    .reduce(sum)

export const findScenicSpot = (input: string): number =>
  processInput(input)
    .map((treeLine, index, treesArr) =>
      treeLine.map((tree, yIndex, treeLineArr) => ({
        ...tree,
        viewDistance:
          // left
          getViewDistance(tree.height, treeLineArr.slice(0, yIndex).reverse()) *
          // right
          getViewDistance(tree.height, treeLineArr.slice(yIndex + 1)) *
          // up - bad
          getViewDistance(
            tree.height,
            treesArr
              .map((t) => t[yIndex])
              .slice(0, index)
              .reverse()
          ) *
          // down - bad
          getViewDistance(
            tree.height,
            treesArr.map((t) => t[yIndex]).slice(index + 1)
          ),
      }))
    )
    .flat()
    .sort(({ viewDistance: a }, { viewDistance: b }) => b - a)[0].viewDistance
