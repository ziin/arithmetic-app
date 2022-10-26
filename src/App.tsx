import { ChangeEvent, useEffect, useState } from 'react'
import { useOperations } from './hooks/useOperations'

function App() {
  const {
    operation: {
      numbers: [first, second],
      operator,
    },
    result,
    min,
    max,
    updateMinMax,
    nextOperation,
  } = useOperations()
  const [guess, setGuess] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  function handleGuess(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setGuess(value)
  }

  useEffect(() => {
    if (Number(guess) === result) {
      setIsCorrect(true)
      setTimeout(() => {
        nextOperation()
        setIsCorrect(false)
        setGuess('')
      }, 2000)
    } else {
      if (isCorrect === true) {
        setIsCorrect(false)
      }
    }
  }, [result, guess])

  return (
    <main className="flex h-full flex-col items-center justify-center gap-2 bg-slate-800 px-8">
      <p>
        {first} <span className="text-6xl">{operator}</span> {second}
      </p>
      <input
        className="rounded-d w-full max-w-xs border-2 border-gray-300 text-center focus:outline-none"
        type="number"
        value={guess}
        onChange={handleGuess}
      />
      <p className={`${isCorrect ? 'visible' : 'invisible'} text-green-500`}>
        Certo!
      </p>

      <div className="absolute bottom-4 flex gap-4 px-4 text-2xl">
        <label htmlFor="min" className="flex flex-col items-center">
          Min
          <input
            id="min"
            className="rounded-d w-full max-w-xs border-2 border-gray-300 text-center focus:outline-none"
            type="number"
            value={min}
            onChange={(e) => updateMinMax({ min: Number(e.target.value), max })}
          />
        </label>
        <label htmlFor="max" className="flex flex-col items-center">
          Max
          <input
            id="max"
            className="rounded-d w-full max-w-xs border-2 border-gray-300 text-center focus:outline-none"
            type="number"
            value={max}
            onChange={(e) => updateMinMax({ max: Number(e.target.value), min })}
          />
        </label>
      </div>
    </main>
  )
}

export default App
