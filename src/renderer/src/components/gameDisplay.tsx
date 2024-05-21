import { Game } from '@renderer/game'
import { useState } from 'react'
import Dice from './dice'

export function GameDisplay({ name }: { name: string }) {
  const [game, setGame] = useState(new Game())

  console.log(game.getGameState())

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h3 className="text-center">
        {name} - score : {game.getScore()} - wins : {game.getWins()}, losses : {game.getLosses()}
      </h3>
      {game.getGameState() === 'game over' && (
        <button onClick={() => setGame(game.resetGame())}>Perdu ! Rejouer</button>
      )}
      {game.getGameState() === 'win' && (
        <button onClick={() => setGame(game.resetGame())}>Gagné ! Rejouer</button>
      )}
      {game.getGameState() === 'not started' && (
        <button
          onClick={() => {
            setGame(game.rollAll())
          }}
        >
          Lancer les dés
        </button>
      )}
      {game.getGameState() === 'playing' && (
        <button
          onClick={() => {
            game.getDices().forEach((dice, index) => {
              if (dice === 6) {
                setGame(game.rollDiceNumber(index))
              }
            })
          }}
        >
          6 ! relance le(s) dé(s)
        </button>
      )}
      <div className="flex flex-col h-full w-full items-center gap-4 pt-2">
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
