import fs from 'fs'

interface BingoNumber {
  value: number
  checked: boolean
}
type BingoSquare = BingoNumber[][]

class BingoCard {
  square: BingoSquare = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => ({ value: 0, checked: false }))
  )

  constructor(square: BingoSquare) {
    this.square = square
  }

  getRow(index: number): BingoNumber[] {
    return this.square[index]
  }

  getColumn(index: number): BingoNumber[] {
    return this.square.map((row) => row[index])
  }

  getScore(): number {
    return this.square.reduce(
      (acc, value) =>
        acc +
        value.reduce(
          (rowAcc, bingoNumber) =>
            rowAcc + (bingoNumber.checked ? 0 : bingoNumber.value),
          0
        ),
      0
    )
  }

  checkNumber(num: number): void {
    this.square.forEach((row, i) =>
      row.forEach((bingoNumber, j) => {
        if (bingoNumber.value === num) this.square[i][j].checked = true
      })
    )
  }

  checkLineCompletion(): boolean {
    for (let i = 0; i < this.square.length; i++) {
      if (this.getRow(i).every((bingoNumber) => bingoNumber.checked))
        return true
    }
    for (let j = 0; j < this.square[0].length; j++) {
      if (this.getColumn(j).every((bingoNumber) => bingoNumber.checked))
        return true
    }
    return false
  }

  toString(): string {
    return this.square
      .map((row) =>
        row.map((x) => x.value.toString().padStart(2, ' ')).join(', ')
      )
      .join('\n')
  }
}

const [numbersInput, ...cardsInput] = fs
  .readFileSync('./src/data/4.txt')
  .toString()
  .split('\n')

const numbers = numbersInput.split(',').map((num) => parseInt(num))

const chunkArrayInGroups = <T>(arr: T[], size: number): T[][] => {
  const myArray = []
  for (let i = 0; i < arr.length; i += size) {
    myArray.push(arr.slice(i, i + size))
  }
  return myArray
}
const filterEmptyStrings = (v: string): boolean => v !== ''
const cards = chunkArrayInGroups(cardsInput.filter(filterEmptyStrings), 5)
  .map((card) =>
    card.map((row) =>
      row
        .split(/ +/)
        .filter(filterEmptyStrings)
        .map((num) => ({ value: parseInt(num), checked: false }))
    )
  )
  .map((card) => new BingoCard(card))

const testCards = (numbers: number[], cards: BingoCard[]): number => {
  for (let i = 0; i < numbers.length; i++) {
    cards.forEach((card) => card.checkNumber(numbers[i]))
    if (i >= 5) {
      for (let j = 0; j < cards.length; j++) {
        if (cards[j].checkLineCompletion()) {
          console.log(cards[j].getScore(), numbers[i])
          return cards[j].getScore() * numbers[i]
        }
      }
      cards.some((card) => card.checkLineCompletion())
    }
  }
  return -1
}

// console.log(
//   cards
//     .map((c) =>
//       c.square
//         .map((row) =>
//           row.map((x) => x.value.toString().padStart(2, ' ')).join(', ')
//         )
//         .join('\n')
//     )
//     .join('\n\n')
// )
console.log('Winning card score: ', testCards(numbers, cards))
