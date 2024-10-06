import { PlayerId } from "rune-sdk"
import { GameResult, GameState } from "../logic"
import {
  getCurrentPlayerId,
  getNextPlayerId,
  getPlayerIndex,
  getPlayerMatchLists,
} from "./utils"

// logic functions
export const revealItem = (
  state: GameState,
  index: number,
  playerId: string
) => {
  if (state.currentTurn === undefined) {
    throw Rune.invalidAction()
  }

  if (state.currentTurn.playerId !== playerId) {
    throw Rune.invalidAction()
  }

  let [item1, item2] = state.currentTurn.guess
  if (item1 === null) {
    item1 = state.matrix[index]
    item1.guessed = state.currentTurn.playerId
  } else if (item2 === null) {
    item2 = state.matrix[index]
    item2.guessed = state.currentTurn.playerId
  }
  state.currentTurn.guess = [item1, item2]

  if (item1 !== null && item2 !== null) {
    checkForMatch(state)
  }
}

function checkForMatch(state: GameState) {
  // check match logic here
  if (state.currentTurn === undefined) {
    return
  }

  const [item1, item2] = state.currentTurn.guess

  if (item1 === null || item2 === null) {
    return
  }

  if (item1.rank === item2.rank) {
    const isNegativeScore = item1.score < 0
    const multiplier = isNegativeScore ? 1 : state.currentTurn.streak + 1
    item1.multiplier = multiplier
    item2.multiplier = multiplier
    state.currentTurn.isMatch = true
    state.currentTurn.matchValue = item1.score * multiplier
  } else if (item1 && item2) {
    state.currentTurn.isMatch = false
  }
}

export function advanceTurn(state: GameState) {
  // advance turn logic here
  const finishingPlayerId = getCurrentPlayerId(state)
  const finishingPlayerIndex = getPlayerIndex(state, finishingPlayerId)
  let startingPlayerId = ""
  let currentStreak = state.currentTurn?.streak || 0
  const hasMatch = state.currentTurn?.isMatch
  const isNegativeScore = (state.currentTurn?.matchValue ?? 0) < 0
  const multipier = isNegativeScore ? 1 : currentStreak + 1

  if (hasMatch) {
    startingPlayerId = finishingPlayerId
    state.matrix = state.matrix.map((item) => {
      if (item.rank === state.currentTurn?.guess[0]?.rank) {
        item.matched = finishingPlayerId
        item.multiplier = multipier
      }
      return item
    })
    if (isNegativeScore) {
      startingPlayerId = getNextPlayerId(state)
      currentStreak = 0
    } else {
      currentStreak += 1
      state.maxStreak[finishingPlayerIndex] = Math.max(
        state.maxStreak[finishingPlayerIndex],
        currentStreak
      )
    }
  } else {
    if (state.playerIds.length === 1) {
      startingPlayerId = finishingPlayerId
    } else {
      startingPlayerId = getNextPlayerId(state)
    }
    currentStreak = 0
  }

  state.turnHistory = state.currentTurn
    ? [...state.turnHistory, state.currentTurn]
    : state.turnHistory
  state.currentTurn = {
    playerId: startingPlayerId,
    guess: [null, null],
    streak: currentStreak,
  }
}

export function endGame(state: GameState) {
  // game over logic here
  const sortedPlayerScores = getPlayerMatchLists(state).sort((a, b) =>
    a.totalMatchValue > b.totalMatchValue ? -1 : 1
  )

  const maxScore = sortedPlayerScores[0].totalMatchValue
  const gameIsTied =
    sortedPlayerScores.filter((player) => player.totalMatchValue === maxScore)
      .length > 1
  state.gameOverResults = sortedPlayerScores.reduce<
    Record<PlayerId, GameResult>
  >((acc, playerStats) => {
    const winResult: GameResult = gameIsTied ? "TIE" : "WON"
    const loseResult: GameResult = "LOST"
    acc[playerStats.playerId] =
      playerStats.totalMatchValue === maxScore ? winResult : loseResult
    return acc
  }, {})
}
