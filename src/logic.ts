import type { PlayerId, RuneClient } from "rune-sdk"
import { revealItem } from "./logic/actions"
import { createMatrix, shuffleMatrix } from "./logic/utils"

export type GameResult = "WON" | "LOST" | "TIE"

export interface Item {
  id: string
  rank: string
  score: number
  guessed: PlayerId
  matched: PlayerId
}

export interface Turn {
  playerId: PlayerId
  guess: [Item | null, Item | null]
  streak: number
  isMatch?: boolean
  matchValue?: number
}

export interface GameState {
  matrix: Item[]
  playerIds: [PlayerId, PlayerId]
  currentTurn?: Turn
  turnHistory: Turn[]
  gameOverResults?: Record<PlayerId, GameResult>
}
type GameActions = {
  revealItem: (cardIndex: number) => void
  revertUnmatchedItems: (lastTurn: Turn) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const matrixConfig = {
      [-30]: 2,
      [10]: 4,
      [15]: 4,
      [20]: 4,
      [25]: 4,
    }
    const newMatrix = createMatrix(matrixConfig)
    const shuffledMatrix = shuffleMatrix(newMatrix)

    return {
      matrix: shuffledMatrix,
      playerIds: [allPlayerIds[0], allPlayerIds[1]],
      currentTurn: {
        playerId: allPlayerIds[0],
        guess: [null, null],
        streak: 0,
      },
      turnHistory: [],
    }
  },
  actions: {
    revealItem: (cardIndex, { game, playerId }) => {
      revealItem(game, cardIndex, playerId)

      if (game.gameOverResults) {
        Rune.gameOver({
          players: game.gameOverResults,
        })
      }
    },
    revertUnmatchedItems: (lastTurn, { game }) => {
      if (!lastTurn.isMatch) {
        game.matrix.forEach((item) => {
          if (
            lastTurn.guess[0]?.id === item.id ||
            lastTurn.guess[1]?.id === item.id
          ) {
            item.guessed = ""
          }
        })
      }
    },
  },
})
