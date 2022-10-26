import { useState, useEffect } from 'react'

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
  const [{ min, max }, setMinMax] = useState({ min: 1, max: 19 })

  const result =
    operation.operator === '+'
      ? operation.numbers[0] + operation.numbers[1]
      : operation.numbers[0] - operation.numbers[1]

  useEffect(() => {
    setOperation(getOperation(min, max))
  }, [min, max])

  return {
    operation,
    result,
    min,
    max,
    updateMinMax: setMinMax,
    nextOperation: () => setOperation(getOperation(min, max)),
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

function getOperation(min = 1, max = 19): Operation {
  return {
    numbers: [getRandomNumber(min, max), getRandomNumber(min, max)],
    operator: getRandomOperator(),
  }
}
