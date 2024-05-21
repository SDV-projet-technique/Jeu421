import { useState } from 'react'
import Dice from './components/dice'
import { useEffect } from 'react'

function App(): JSX.Element {
  const [dice1, setDice1] = useState<number>(1)
  const [dice2, setDice2] = useState<number>(1)
  const [dice3, setDice3] = useState<number>(1)

  const [gameState, setGameState] = useState<
    'rules' | 'not started' | 'playing' | 'game over' | 'win'
  >('rules')

  function rollDice() {
    return Math.floor(Math.random() * 6) + 1
  }

  function rollAll() {
    setDice1(rollDice())
    setDice2(rollDice())
    setDice3(rollDice())
  }

  useEffect(() => {
    const dices = [dice1, dice2, dice3]
    if (gameState === 'playing' && !dices.includes(6)) {
      if (dices.includes(4) && dices.includes(2) && dices.includes(1)) {
        setGameState('win')
      } else {
        setGameState('game over')
      }
    }
  }, [dice1, dice2, dice3, gameState])

  function resetGame() {
    setDice1(1)
    setDice2(1)
    setDice3(1)
    setGameState('not started')
  }

  if (gameState === 'rules') {
    return (
      <div>
        <h1>Jeu du 421</h1>
        <h2>
          les règles : Lancez les dés et tentez d'obtenir 4, 2 et 1. Si vous faites un 6, vous
          pouvez relancer le dé.
        </h2>
        <button onClick={() => setGameState('not started')}>Commencer</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Jeu du 421</h1>
      {gameState === 'game over' && (
        <>
          <h2>Perdu</h2>
          <button onClick={() => resetGame()}>rejouer</button>
        </>
      )}
      {gameState === 'win' && (
        <>
          <h2>Gagné</h2>
          <button onClick={() => resetGame()}>rejouer</button>
        </>
      )}
      {gameState === 'not started' && (
        <>
          <h2>Commencer</h2>
          <button
            onClick={() => {
              rollAll()
              setGameState('playing')
            }}
            disabled={gameState !== 'not started'}
          >
            Lancer les dés
          </button>
        </>
      )}
      {gameState === 'playing' && <h2>Tu as fait un 6 ! Relance le dé !</h2>}
      <Dice number={1} value={dice1} roll={() => setDice1(rollDice())} canRoll={dice1 === 6} />
      <Dice number={2} value={dice2} roll={() => setDice2(rollDice())} canRoll={dice2 === 6} />
      <Dice number={3} value={dice3} roll={() => setDice3(rollDice())} canRoll={dice3 === 6} />
    </div>
  )
}

export default App
