import { multiply } from '../../util'

type Id = number
type Item = number
type Items = Item[]
interface Operation {
  op: 'multiply' | 'add' | 'square'
  value: number
}
interface Test {
  type: 'divisible'
  value: number
  true: number
  false: number
}

class Monkey {
  id: Id
  items: Items
  operation: Operation
  test: Test
  inspections = 0

  constructor(id: Id, startingItems: Items, operation: Operation, test: Test) {
    this.id = id
    this.items = startingItems
    this.operation = operation
    this.test = test
  }

  doOp(item: Item): Item {
    const v = this.operation.value
    return this.operation.op === 'add'
      ? item + v
      : this.operation.op === 'multiply'
      ? item * v
      : item * item
  }

  loop(monkeys: Monkey[]) {
    while (this.items.length > 0) {
      const item = this.items.shift() as Item // object cannot be undefined
      this.inspections++
      this.throwItem(monkeys, Math.floor(this.doOp(item) / 3))
    }
  }

  throwItem(monkeys: Monkey[], item: Item) {
    ;(item % this.test.value === 0
      ? monkeys.find((m) => m.id === this.test.true)
      : monkeys.find((m) => m.id === this.test.false)
    )?.catchItem(item)
  }

  catchItem(item: Item) {
    this.items.push(item)
  }
}

export const processInput = (input: string) =>
  input.split('\n\n').map((monkey) => {
    const m = monkey.split('\n')
    const id = Number(m[0].split(' ')[1].slice(0, -1))
    const si = m[1]
      .split(' ')
      .slice(4)
      .map((n) => Number(n.replace(/,/, '')))
    const operationArr = m[2].split('old ')[1].split(' ')

    const operation = m[2].includes('old * old')
      ? {
          value: NaN,
          op: 'square' as Operation['op'],
        }
      : {
          value: Number(operationArr[1]),
          op: (operationArr[0] === '*' ? 'multiply' : 'add') as Operation['op'],
        }
    const testValue = Number(m[3].split('by ').slice(-1))
    const mT = Number(m[4].split(' ').slice(-1))
    const mF = Number(m[5].split(' ').slice(-1))
    return new Monkey(id, si, operation, {
      type: 'divisible',
      value: testValue,
      true: mT,
      false: mF,
    })
  })

export const findMonkeyInspections = (input: string): number => {
  const monkeys = processInput(input)
  Array.from({ length: 20 }).forEach(() => {
    monkeys.forEach((monkey, _, mArr) => {
      monkey.loop(mArr)
    })
  })
  return monkeys
    .map((m) => m.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce(multiply, 1)
}
