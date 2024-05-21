export class Game {
  private dices: number[]
  private gameState: 'not started' | 'playing' | 'game over' | 'win'
  private score: number

  constructor(
    dices: number[] = [1, 1, 1],
    gameState: 'not started' | 'playing' | 'game over' | 'win' = 'not started',
    score: number = 0
  ) {
    this.dices = [...dices]
    this.gameState = gameState
    this.score = score
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  rollDiceNumber(number: number): Game {
    const newDices = [...this.dices]
    newDices[number] = this.rollDice()
    const newGame = new Game(newDices, 'playing', this.score)
    return newGame.checkGameState().updateScore()
  }

  rollAll(): Game {
    const newDices = [this.rollDice(), this.rollDice(), this.rollDice()]
    const newGame = new Game(newDices, 'playing', this.score)
    return newGame.checkGameState().updateScore()
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
    return new Game(this.dices, newGameState, this.score)
  }

  resetGame(): Game {
    return new Game([1, 1, 1], 'not started', this.score)
  }

  updateScore(): Game {
    let newScore = this.score
    if (this.gameState === 'win') {
      newScore += 10 // Update score if the player wins
    } else if (this.gameState === 'game over') {
      newScore -= 5 // Penalize score if the game is over
    }
    return new Game(this.dices, this.gameState, newScore)
  }

  getDices(): number[] {
    return [...this.dices]
  }

  getGameState(): 'not started' | 'playing' | 'game over' | 'win' {
    return this.gameState
  }

  getScore(): number {
    return this.score
  }
}
