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
    return newGame.checkGameState()
  }

  rollAll(): Game {
    const newDices = [this.rollDice(), this.rollDice(), this.rollDice()]
    const newGame = new Game(newDices, 'playing', this.score, this.wins, this.losses)
    return newGame.checkGameState()
  }

  checkGameState(): Game {
    let newGameState = this.gameState
    let newWins = this.wins
    let newLosses = this.losses
    let newScore = this.score

    if (this.gameState === 'playing' && !this.dices.includes(6)) {
      if (this.dices.includes(4) && this.dices.includes(2) && this.dices.includes(1)) {
        newGameState = 'win'
        newWins += 1
        newScore += 10
      } else {
        newGameState = 'game over'
        newLosses += 1
        newScore -= 1
      }
    }

    return new Game(this.dices, newGameState, newScore, newWins, newLosses)
  }

  resetGame(): Game {
    return new Game([1, 1, 1], 'not started', this.score, this.wins, this.losses)
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
