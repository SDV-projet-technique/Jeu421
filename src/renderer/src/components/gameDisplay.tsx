import { Game } from '@renderer/game'
import { useEffect, useState } from 'react'
import Dice from './dice'

export function GameDisplay({ name }: { name: string }) {
  const [game, setGame] = useState(new Game())
  const [isAnimating, setIsAnimating] = useState(false)

  const [animatedDices, setAnimatedDices] = useState(game.getDices())

  useEffect(() => {
    setAnimatedDices(game.getDices())
  }, [game])

  function animateAll() {
    const interval = setInterval(() => {
      setAnimatedDices([game.rollDice(), game.rollDice(), game.rollDice()])
    }, 50)
    setTimeout(() => {
      clearInterval(interval)
    }, 1000)
  }

  function animateSix() {
    const interval = setInterval(() => {
      setAnimatedDices(game.getDices().map((dice) => (dice === 6 ? game.rollDice() : dice)))
    }, 50)
    setTimeout(() => {
      clearInterval(interval)
    }, 1000)
  }

  return (
    <div className="h-full w-full flex flex-col items-center mt-2">
      {game.getGameState() === 'game over' && (
        <button
          className="bg-red-300 hover:bg-red-200 p-2 rounded cursor-pointer"
          onClick={() => setGame(game.resetGame())}
        >
          Perdu ! Rejouer
        </button>
      )}
      {game.getGameState() === 'win' && (
        <button
          className="bg-green-300 hover:bg-green-200 p-2 rounded cursor-pointer"
          onClick={() => setGame(game.resetGame())}
        >
          Gagné ! Rejouer
        </button>
      )}
      {game.getGameState() === 'not started' && (
        <button
          className="bg-blue-300 hover:bg-blue-200 p-2 rounded cursor-pointer"
          onClick={() => {
            setIsAnimating(true)
            animateAll()
            setTimeout(() => {
              setIsAnimating(false)
              setGame(game.rollAll())
            }, 1000)
          }}
          disabled={isAnimating}
        >
          Lancer les dés
        </button>
      )}
      {game.getGameState() === 'playing' && (
        <button
          className="bg-yellow-300 hover:bg-yellow-100 p-2 rounded cursor-pointer"
          onClick={() => {
            setIsAnimating(true)
            animateSix()
            setTimeout(() => {
              setIsAnimating(false)
              setGame(game.rollAllSix())
            }, 1000)
          }}
          disabled={isAnimating}
        >
          6 ! relance le(s) dé(s)
        </button>
      )}
      <div className="flex h-max w-full items-center justify-center gap-4 pt-2 my-3">
        <Dice value={isAnimating ? animatedDices[0] : game.getDices()[0]} />
        <Dice value={isAnimating ? animatedDices[1] : game.getDices()[1]} />
        <Dice value={isAnimating ? animatedDices[2] : game.getDices()[2]} />
      </div>
      <table className="text-center bg-white">
        <thead>
          <tr>
            <th className="border border-black px-2">Victoires</th>
            <th className="border border-black px-2">Défaites</th>
            <th className="border border-black px-2">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black">{game.getWins()}</td>
            <td className="border border-black">{game.getLosses()}</td>
            <td className="border border-black">{game.getScore()}</td>
          </tr>
          <tr>
            <td colSpan={3} className="border border-black text-xl font-bold">
              {name}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
