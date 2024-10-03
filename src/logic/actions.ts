import { PlayerId } from "rune-sdk"
import { GameResult, GameState } from "../logic"
import {
  getCurrentPlayerId,
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
    const multiplier = state.currentTurn.streak + 1
    state.currentTurn.isMatch = true
    state.currentTurn.matchValue = item1.score * multiplier
  } else if (item1 && item2) {
    state.currentTurn.isMatch = false
  }

  advanceTurn(state)

  // check if game is over
  const totalMatches = getPlayerMatchLists(state).reduce(
    (acc, player) => acc + player.totalMatches,
    0
  )
  if (totalMatches === state.matrix.length / 2) {
    gameOver(state)
  }
}

function advanceTurn(state: GameState) {
  // advance turn logic here
  const finishingPlayerId = getCurrentPlayerId(state)
  let startingPlayerId = ""
  let currentStreak = state.currentTurn?.streak || 0
  const hasMatch = state.currentTurn?.isMatch

  if (hasMatch) {
    startingPlayerId = finishingPlayerId
    state.matrix = state.matrix.map((item) => {
      if (item.rank === state.currentTurn?.guess[0]?.rank) {
        item.matched = finishingPlayerId
      }
      return item
    })
    currentStreak += 1
  } else {
    if (state.playerIds.length === 1) {
      startingPlayerId = finishingPlayerId
    } else {
      startingPlayerId =
        state.playerIds[getPlayerIndex(state, finishingPlayerId) === 0 ? 1 : 0]
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

function gameOver(state: GameState) {
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
  console.log("Game Over?", state.gameOverResults)
}
