import { useState } from 'react'
import { GameDisplay } from './components/gameDisplay'

function App() {
  const [players, setPlayers] = useState<string[]>([])
  const [startGame, setStartGame] = useState(false)
  const [newName, setNewName] = useState('')

  return (
    <div className="flex flex-col items-center gap-2 w-screen h-screen bg-blue-100">
      <h1 className="bg-amber-200 p-3 w-full font-bold text-3xl">Jeu du 421</h1>
      <h2 className="border border-black p-3 text-center w-11/12 mx-auto text-lg bg-white rounded">
        <span className="underline text-xl font-bold">Comment jouer ?</span>
        <br />
        Lancez les dés, le but est d'obtenir un 4, un 2 et 1 peut importe l'ordre. <br />
        Si vous faites un 6, vous pouvez relancer le dé.
      </h2>
      <div className="h-full w-full flex flex-row justify-around">
        {startGame ? (
          players.map((player) => <GameDisplay key={player} name={player} />)
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="font-bold underline">⬇ Entrez le nom du ou des joueurs (max 3) ⬇</h3>
            <form
              className="my-3"
              onSubmit={(e) => {
                e.preventDefault()
                players.length < 3 && setPlayers([...players, newName])
                setNewName('')
              }}
            >
              <input
                type="text"
                className="rounded-l px-2 py-1"
                value={newName}
                maxLength={20}
                onChange={(e) => players.length < 3 && setNewName(e.target.value)}
              />
              {players.length < 3 ? (
                <button className="p-1 rounded-r bg-amber-200 hover:bg-amber-100">Ajouter</button>
              ) : (
                <button className="p-1 rounded-r bg-gray-300 text-gray-500 cursor-not-allowed">
                  Ajouter
                </button>
              )}
            </form>
            <ul className="flex flex-col text-right">
              {players.map((player) => (
                <li key={player} className="mb-2">
                  {player}
                  <button
                    className="ml-2 bg-red-600 hover:bg-red-400 text-white p-1 rounded"
                    onClick={() => {
                      setPlayers(players.filter((p) => p !== player))
                    }}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              className={
                players.length && players.length <= 3
                  ? 'bg-green-300 hover:bg-green-100 p-2 rounded w-1/2 cursor-pointer'
                  : 'bg-gray-300 p-2 rounded w-1/2 cursor-not-allowed text-gray-500'
              }
              onClick={() => players.length <= 3 && setStartGame(true)}
              disabled={players.length === 0}
            >
              Commencer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
