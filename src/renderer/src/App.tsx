import { useState } from 'react'
import Dice from './components/dice'
import { Game } from './game'

function GameDisplay({ name }: { name: string }) {
  const [game, setGame] = useState(new Game())

  console.log(game.getGameState())

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h3>
        {name} - score : {game.getScore()} - wins : {game.getWins()}, losses : {game.getLosses()}
      </h3>
      {game.getGameState() === 'game over' && (
        <>
          <p>Perdu</p>
          <button onClick={() => setGame(game.resetGame())}>rejouer</button>
        </>
      )}
      {game.getGameState() === 'win' && (
        <>
          <p>Gagné</p>
          <button onClick={() => setGame(game.resetGame())}>rejouer</button>
        </>
      )}
      {game.getGameState() === 'not started' && (
        <>
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
      {game.getGameState() === 'playing' && <p>Tu as fait un 6 ! Relance le dé !</p>}
      <div className="flex flex-col h-full w-full items-center">
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
    </div>
  )
}

function App() {
  const [players, setPlayers] = useState<string[]>([])
  const [startGame, setStartGame] = useState(false)
  const [newName, setNewName] = useState('')

  return (
    <div className="flex flex-col items-center">
      <h1>Jeu du 421</h1>
      <h2 className="text-center">
        les règles : Lancez les dés et tentez d'obtenir 4, 2 et 1. Si vous faites un 6, vous pouvez
        relancer le dé.
      </h2>
      <div className="h-full w-full flex flex-row justify-around">
        {startGame ? (
          players.map((player) => <GameDisplay key={player} name={player} />)
        ) : (
          <div className="flex flex-col items-center">
            <h3>Entrez le nom des joueurs</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setPlayers([...players, newName])
                setNewName('')
              }}
            >
              <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <button>Ajouter</button>
            </form>
            <ul>
              {players.map((player) => (
                <li key={player}>
                  {player}
                  <button
                    className="ml-2"
                    onClick={() => {
                      setPlayers(players.filter((p) => p !== player))
                    }}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setStartGame(true)} disabled={players.length === 0}>
              Commencer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
