import { useState } from 'react'
import { GameDisplay } from './components/gameDisplay'

function App() {
  const [players, setPlayers] = useState<string[]>([])
  const [startGame, setStartGame] = useState(false)
  const [newName, setNewName] = useState('')

  return (
    <div className="flex flex-col items-center gap-2">
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
