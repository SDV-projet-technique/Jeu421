import { useState } from 'react'
import Dice from './components/dice'
import { Game } from './game'

function App(): JSX.Element {
  const [game, setGame] = useState(new Game())

  console.log(game.getGameState())

  return (
    <div>
      <h1>Jeu du 421 - score : {game.getScore()}</h1>
      {game.getGameState() === 'game over' && (
        <>
          <h2>Perdu</h2>
          <button onClick={() => setGame(game.resetGame())}>rejouer</button>
        </>
      )}
      {game.getGameState() === 'win' && (
        <>
          <h2>Gagné</h2>
          <button onClick={() => setGame(game.resetGame())}>rejouer</button>
        </>
      )}
      {game.getGameState() === 'not started' && (
        <>
          <h2>Commencer</h2>
          <button
            onClick={() => {
              setGame(game.rollAll())
            }}
            disabled={game.getGameState() !== 'not started'}
          >
            Lancer les dés
          </button>
        </>
      )}
      {game.getGameState() === 'playing' && <h2>Tu as fait un 6 ! Relance le dé !</h2>}
      <Dice
        number={1}
        value={game.getDices()[0]}
        roll={() => setGame(game.rollDiceNumber(0))}
        canRoll={game.getDices()[0] === 6}
      />
      <Dice
        number={2}
        value={game.getDices()[1]}
        roll={() => setGame(game.rollDiceNumber(1))}
        canRoll={game.getDices()[1] === 6}
      />
      <Dice
        number={3}
        value={game.getDices()[2]}
        roll={() => setGame(game.rollDiceNumber(2))}
        canRoll={game.getDices()[2] === 6}
      />
    </div>
  )
}

export default App
