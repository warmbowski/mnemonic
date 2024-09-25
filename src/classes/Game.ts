import { Deck } from "./Deck"

type PlayerId = string
type GameResult = "WON" | "LOST" | "TIE"

interface GameConfig {
  gameId: string
  playerIds?: [PlayerId, PlayerId]
  deck: Deck
}

interface Card {
  id: number
  rank: string
  value: number
  show?: boolean
}

interface Turn {
  playerId: PlayerId
  cards: [Card | null, Card | null]
  streak: number
  hasMatch?: boolean
  matchValue?: number
}

export class Game {
  gameId: string = ""
  deck: Deck
  matrix: Card[] = []
  playerIds: [PlayerId, PlayerId] = ["", ""]
  currentTurn: Turn | undefined
  turnHistory: Turn[] = []
  gameOverResults: Record<PlayerId, GameResult> | undefined

  constructor(config: GameConfig) {
    this.gameId = config.gameId
    this.playerIds = config.playerIds || ["", ""]

    this.deck = config.deck
    this.inirializeGame()
  }

  private inirializeGame() {
    // create game meatrix here
    const deck = this.deck.getDeck()
    this.matrix = deck.map((card, index) => ({
      id: index,
      rank: `Card ${index}`,
      value: card.value,
    }))
  }

  private getPlayerIndex(playerId: string) {
    return this.playerIds.findIndex((id) => id === playerId)
  }

  get currentPlayer() {
    return this.currentTurn?.playerId || ""
  }

  get playerMatchLists() {
    return this.playerIds.map((playerId) => {
      const matches = this.turnHistory.filter(
        (turn) => turn.playerId === playerId && turn.hasMatch
      )
      return {
        playerId,
        matches,
        totalMatches: matches.length,
        totalMatchValue: matches.reduce(
          (acc, turn) => acc + (turn.matchValue ?? 0),
          0
        ),
      }
    })
  }

  public addPlayer(playerId: string) {
    // add player logic here
    if (this.playerIds[0] === "") {
      this.playerIds[0] = playerId
    } else if (this.playerIds[1] === "") {
      this.playerIds[1] = playerId
    }
  }

  public removePlayer(playerId: string) {
    // remove player logic here
    const playerIndex = this.getPlayerIndex(playerId)
    this.playerIds[playerIndex] = ""
  }

  private advanceTurn(hasMatch: boolean = false) {
    // advance turn logic here
    const finishingPlayerId = this.currentPlayer
    let startingPlayerId = ""
    let currentStreak = this.currentTurn?.streak || 0

    if (hasMatch) {
      startingPlayerId = finishingPlayerId
      currentStreak += 1
    } else {
      startingPlayerId =
        this.playerIds[this.getPlayerIndex(finishingPlayerId) === 0 ? 1 : 0]
      currentStreak = 0
    }

    this.turnHistory = this.currentTurn
      ? [...this.turnHistory, this.currentTurn]
      : this.turnHistory
    this.currentTurn = {
      playerId: startingPlayerId,
      cards: [null, null],
      streak: currentStreak,
    }
  }

  public revealCard(index: number, playerId: string) {
    // turn card logic here
    if (this.currentTurn === undefined) {
      return
    }

    if (this.currentPlayer !== playerId) {
      return
    }

    let [card1, card2] = this.currentTurn.cards
    if (card1 === null) {
      card1 = this.matrix[index]
      card1.show = true
    } else if (card2 === null) {
      card2 = this.matrix[index]
      card2.show = true
    }

    if (card1 !== null && card2 !== null) {
      this.checkMatch(card1, card2)
    }
  }

  private checkMatch(card1: Card, card2: Card) {
    // check match logic here
    if (this.currentTurn === undefined) {
      return
    }

    if (card1.rank === card2.rank) {
      const multiplier = this.currentTurn.streak + 1
      this.currentTurn.hasMatch = true
      this.currentTurn.matchValue = card1.value * multiplier
    } else {
      this.currentTurn.hasMatch = false
    }

    this.advanceTurn(this.currentTurn.hasMatch)

    // check if game is over
    const totalMatches = this.playerMatchLists.reduce(
      (acc, player) => acc + player.totalMatches,
      0
    )
    if (totalMatches === this.matrix.length) {
      this.gameOver()
    }
  }

  private gameOver() {
    // game over logic here
    const sortedPlayerScores = this.playerMatchLists.sort((a, b) =>
      a.totalMatchValue > b.totalMatchValue ? -1 : 1
    )

    const maxScore = sortedPlayerScores[0].totalMatchValue
    const gameIsTied =
      sortedPlayerScores.filter((player) => player.totalMatchValue === maxScore)
        .length > 1
    this.gameOverResults = sortedPlayerScores.reduce<
      Record<PlayerId, GameResult>
    >((acc, playerStats) => {
      const winResult: GameResult = gameIsTied ? "TIE" : "WON"
      const loseResult: GameResult = "LOST"
      acc[playerStats.playerId] =
        playerStats.totalMatchValue === maxScore ? winResult : loseResult
      return acc
    }, {})
  }
}
