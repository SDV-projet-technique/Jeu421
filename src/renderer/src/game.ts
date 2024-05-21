export class Game {
  private dices: number[]
  private gameState: 'not started' | 'playing' | 'game over' | 'win'

  constructor(
    dices: number[] = [1, 1, 1],
    gameState: 'not started' | 'playing' | 'game over' | 'win' = 'not started'
  ) {
    this.dices = [...dices]
    this.gameState = gameState
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  rollDiceNumber(number: number): Game {
    const newDices = [...this.dices]
    newDices[number] = this.rollDice()
    const newGame = new Game(newDices, 'playing')
    return newGame.checkGameState()
  }

  rollAll(): Game {
    const newDices = [this.rollDice(), this.rollDice(), this.rollDice()]
    const newGame = new Game(newDices, 'playing')
    return newGame.checkGameState()
  }

  checkGameState(): Game {
    let newGameState = this.gameState
    if (this.gameState === 'playing' && !this.dices.includes(6)) {
      if (this.dices.includes(4) && this.dices.includes(2) && this.dices.includes(1)) {
        newGameState = 'win'
      } else {
        newGameState = 'game over'
      }
    }
    return new Game(this.dices, newGameState)
  }

  resetGame(): Game {
    return new Game([1, 1, 1], 'not started')
  }

  getDices(): number[] {
    return [...this.dices]
  }

  getGameState(): 'not started' | 'playing' | 'game over' | 'win' {
    return this.gameState
  }
}
