import { useState } from 'react'

type Operation = {
  numbers: [number, number]
  operator: '-' | '+'
}

const defaultOperation: Operation = {
  numbers: [5, 3],
  operator: '-',
}

export const useOperations = () => {
  const [operation, setOperation] = useState(defaultOperation)

  const result =
    operation.operator === '+'
      ? operation.numbers[0] + operation.numbers[1]
      : operation.numbers[0] - operation.numbers[1]

  return {
    operation,
    result,
    nextOperation: () => setOperation(getOperation()),
  }
}

function getRandomNumber(min = 1, max = 19) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomBool() {
  return Math.random() > 0.5 ? true : false
}

function getRandomOperator() {
  return randomBool() ? '-' : '+'
}

function getOperation(): Operation {
  return {
    numbers: [getRandomNumber(), getRandomNumber()],
    operator: getRandomOperator(),
  }
}
