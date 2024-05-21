export class Game {
  private dices: number[]
  private gameState: 'not started' | 'playing' | 'game over' | 'win'
  private score: number
  private wins: number
  private losses: number

  constructor(
    dices: number[] = [1, 1, 1],
    gameState: 'not started' | 'playing' | 'game over' | 'win' = 'not started',
    score: number = 0,
    wins: number = 0,
    losses: number = 0
  ) {
    this.dices = [...dices]
    this.gameState = gameState
    this.score = score
    this.wins = wins
    this.losses = losses
  }

  private rollDice(): number {
    return Math.floor(Math.random() * 6) + 1
  }

  rollDiceNumber(number: number): Game {
    const newDices = [...this.dices]
    newDices[number] = this.rollDice()
    const newGame = new Game(newDices, 'playing', this.score, this.wins, this.losses)
    return newGame.checkGameState().updateScore()
  }

  rollAll(): Game {
    const newDices = [this.rollDice(), this.rollDice(), this.rollDice()]
    const newGame = new Game(newDices, 'playing', this.score, this.wins, this.losses)
    return newGame.checkGameState().updateScore()
  }

  checkGameState(): Game {
    let newGameState = this.gameState
    let newWins = this.wins
    let newLosses = this.losses

    if (this.gameState === 'playing' && !this.dices.includes(6)) {
      if (this.dices.includes(4) && this.dices.includes(2) && this.dices.includes(1)) {
        newGameState = 'win'
        newWins += 1
      } else {
        newGameState = 'game over'
        newLosses += 1
      }
    }

    return new Game(this.dices, newGameState, this.score, newWins, newLosses)
  }

  resetGame(): Game {
    return new Game([1, 1, 1], 'not started', 0, this.wins, this.losses)
  }

  updateScore(): Game {
    let newScore = this.score
    if (this.gameState === 'win') {
      newScore += 10 // Update score if the player wins
    } else if (this.gameState === 'game over') {
      newScore -= 5 // Penalize score if the game is over
    }
    return new Game(this.dices, this.gameState, newScore, this.wins, this.losses)
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

  getWins(): number {
    return this.wins
  }

  getLosses(): number {
    return this.losses
  }
}
