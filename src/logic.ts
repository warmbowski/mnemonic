import type { RuneClient } from "rune-sdk"
import {
  advanceTurn,
  computeGameOverResults,
  persistsPersonalBests,
  revealItem,
} from "./logic/actions"
import { createMatrix, shuffleMatrix } from "./logic/utils"
import { GameState, PersistedDataV1, Turn } from "./logic/types"

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
      // making sure components reset when game is restarted
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
