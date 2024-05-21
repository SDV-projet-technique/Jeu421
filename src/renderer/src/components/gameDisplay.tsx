import { Game } from '@renderer/game'
import { useState } from 'react'
import Dice from './dice'
import { useEffect } from 'react'

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
      <div className="flex flex-col h-full w-full items-center gap-4 pt-2">
        <Dice value={isAnimating ? animatedDices[0] : game.getDices()[0]} />
        <Dice value={isAnimating ? animatedDices[1] : game.getDices()[1]} />
        <Dice value={isAnimating ? animatedDices[2] : game.getDices()[2]} />
      </div>
    </div>
  )
}
