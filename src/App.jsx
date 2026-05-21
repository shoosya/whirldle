import { useState, useRef } from 'react'
import { generate, count } from "random-words"
import './App.css'

function App() {
  const [answer, setAnswer] = useState(generate({ minLength: 5, maxLength: 5 }).toUpperCase())
  const ref = useRef()
  const [count, setCount] = useState(0)
  const [guess, setGuess] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [allGuesses, setAllGuesses] = useState([])
  const isOutOfAttempts = count === 5
  const isCorrectGuess = guess.toUpperCase() === answer

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.length !== 5 || isOutOfAttempts || isCorrectGuess) return

    const submittedGuess = inputValue.toUpperCase()
    setAllGuesses([...allGuesses, submittedGuess])
    setCount(count + 1)
    setGuess(submittedGuess)
    setInputValue('')
  }

  const getStatusMessage = () => {
    if (isOutOfAttemts && !isCorrectGuess) {
      `Nice try! The word was: ${answer}`
    } else if (isCorrectGuess) {
      'Well done! Click Reset to play again.'
    } else {
      null
    }
  }

  return (
    <div className="App">
      <h1>WHIRLDLE</h1>
      <table className='guess-table'>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => {
            const rowGuess = allGuesses[rowIndex] || ''
            return (
              <tr key={rowIndex}>
                {Array.from({ length: 5 }).map((_, colIndex) => {
                  const letter = rowGuess[colIndex] || ''
                  if (!letter) {
                    return <td key={colIndex} />
                  }
                  const isCorrect = letter === answer[colIndex]
                  const isInWord = answer.includes(letter)
                  return (
                    <td key={colIndex} className={isCorrect ? 'correct' : isInWord ? 'in-word' : 'wrong'}>
                      {letter}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <form ref={ref} name={'guess-form'} onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength={5}
          placeholder={isOutOfAttempts ? 'You\'re out of guesses' : 'Guess the word'}
          value={inputValue}
          disabled={isOutOfAttempts || isCorrectGuess}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button 
          type="submit"
          disabled={inputValue.length !== 5 || isOutOfAttempts || isCorrectGuess}>
            Submit
        </button>
      </form>
      {isOutOfAttempts && !isCorrectGuess && <div className='status'> `The word was: ${answer}. Click Reset to try again!`</div>}
      {isCorrectGuess && <div className='status'>'Well done! Click Reset to play again.'</div>}
      <button 
        type="reset"
        onClick={() => {
          setCount(0)
          setGuess('')
          setInputValue('')
          setAllGuesses([])
          setAnswer(generate({ minLength: 5, maxLength: 5 }).toUpperCase())
          ref.current.reset()
        }}>
          Reset
      </button>
      <footer className="app-footer">
        Created for educational purposes by <a href="https://github.com/shoosya">Natalie Kay</a>
      </footer>
    </div>
  )
}

export default App
