import './App.css'
import { ChangeEvent, useEffect, useState } from 'react'
import { useOperations } from './hooks/useOperations'

function App() {
  const {
    operation: {
      numbers: [first, second],
      operator,
    },
    result,
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
      }, 1200)
    } else {
      if (isCorrect === true) {
        setIsCorrect(false)
      }
    }
  }, [result, guess])

  return (
    <main className="App">
      <p className="operation">
        {first} {operator} {second}
      </p>
      <input
        type="number"
        value={guess}
        onChange={handleGuess}
        style={{ color: isCorrect ? '#22c55e' : 'inherit' }}
      />
      <p className="congrats" style={{ opacity: isCorrect ? 1 : 0 }}>
        Acertou!
      </p>
    </main>
  )
}

export default App
