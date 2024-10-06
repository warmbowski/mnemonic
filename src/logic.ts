import type { GameStateWithPersisted, PlayerId, RuneClient } from "rune-sdk"
import {
  advanceTurn,
  computeGameOverResults,
  persistsPersonalBests,
  revealItem,
} from "./logic/actions"
import { createMatrix, shuffleMatrix } from "./logic/utils"

export type GameResult = "WON" | "LOST" | "TIE"

export interface Item {
  id: string
  index: number
  rank: number
  color: "color0" | "color1" | "color2" | "color3"
  score: number
  offsetX?: string
  offsetY?: string
  coverIndex?: number
  guessed: PlayerId
  matched: PlayerId
  multiplier: number
}

export interface Turn {
  playerId: PlayerId
  guess: [Item | null, Item | null]
  streak: number
  isMatch?: boolean
  matchValue?: number
}

export interface GameState {
  signature: string
  matrix: Item[]
  playerIds: PlayerId[]
  currentTurn?: Turn
  turnHistory: Turn[]
  gameOverResults?: Record<PlayerId, GameResult>
  theme?: string
  maxStreak: number[]
}

export interface PersistedDataV1 {
  version: number
  onboarded?: boolean
  personalBests?: {
    totalGames: number
    totalMatches: number
    totalTurns: number
    totalEarnings: number
    highestEarnings: number
    highestStreak: number
    fewestTurns: number
  }
}

export type GameStateWithPersited = GameStateWithPersisted<
  GameState,
  PersistedDataV1
>

type GameActions = {
  revealItem: (cardIndex: number) => void
  revertUnmatchedItems: (lastTurn: Turn) => void
  advanceTurn: () => void
  endGame: () => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions, PersistedDataV1>
}

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  persistPlayerData: true,
  setup: (allPlayerIds) => {
    const matrixConfig = {
      [-20]: 2,
      [10]: 4,
      [15]: 4,
      [20]: 4,
      [25]: 4,
      [30]: 4,
      [35]: 2,
      [40]: 2,
    }
    const newMatrix = createMatrix(matrixConfig)
    const shuffledMatrix = shuffleMatrix(newMatrix)

    const startIndex = Math.floor(Math.random() * allPlayerIds.length)

    return {
      // somewhat unique deterministic game signature mainly for
      // making sure components reset when game restarted
      signature: shuffledMatrix.map((item) => item.rank).join(""),
      matrix: shuffledMatrix,
      playerIds: allPlayerIds,
      currentTurn: {
        playerId: allPlayerIds[startIndex],
        guess: [null, null],
        streak: 0,
      },
      turnHistory: [],
      maxStreak: allPlayerIds.map(() => 0),
    }
  },
  actions: {
    revealItem: (cardIndex, { game, playerId }) => {
      revealItem(game, cardIndex, playerId)
    },
    revertUnmatchedItems: (turn, { game }) => {
      if (!turn.isMatch) {
        game.matrix.forEach((item) => {
          if (turn.guess[0]?.id === item.id || turn.guess[1]?.id === item.id) {
            item.guessed = ""
          }
        })
      }
    },
    advanceTurn: (_, { game }) => {
      advanceTurn(game)
    },
    endGame: (_, { game, playerId }) => {
      computeGameOverResults(game)

      if (game.gameOverResults) {
        persistsPersonalBests(game, playerId)
        Rune.gameOver({
          players: game.gameOverResults,
          // delayPopUp: true, // to be used with Rune.showGameOverPopUp()
          minimizePopUp: true,
        })
      }
    },
  },
})
