import { PlayerId } from "rune-sdk"
import { GameResult, GameState, Item } from "../logic"

interface MatrixConfig {
  [-30]: number
  [10]: number
  [15]: number
  [20]: number
  [25]: number
}

// utility functions
export function getPlayerIndex(state: GameState, playerId: string) {
  return state.playerIds.findIndex((id) => id === playerId)
}

export function getCurrentPlayerId(state: GameState) {
  return state.currentTurn?.playerId || ""
}

export function getPlayerMatchLists(state: GameState) {
  return state.playerIds.map((playerId) => {
    const matches = state.turnHistory.filter(
      (turn) => turn.playerId === playerId && turn.isMatch
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

export function createMatrix(config: MatrixConfig) {
  const uniqueItems = Object.entries(config).reduce<Omit<Item, "id">[]>(
    (acc, [score, count]) => {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({
          rank: `Item-${acc.length + i + 1}`,
          score: Number(score),
          show: "",
        })
      }
      return [...acc, ...list]
    },
    []
  )

  return uniqueItems.concat(uniqueItems).map((item, index) => ({
    id: `${index}`,
    ...item,
  }))
}

export function shuffleMatrix<T>(list: T[]) {
  //based on Fisher-Yates shuffle algorithm
  const newList = [...list]
  let currIndex = list.length - 1
  let tempValue: T | undefined
  let randomIndex: number | undefined

  while (currIndex >= 0) {
    randomIndex = Math.floor(Math.random() * currIndex)
    tempValue = newList[currIndex]
    newList[currIndex] = newList[randomIndex]
    newList[randomIndex] = tempValue
    currIndex -= 1
  }

  return newList
}

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
    item1.show = state.currentTurn.playerId
  } else if (item2 === null) {
    item2 = state.matrix[index]
    item2.show = state.currentTurn.playerId
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
  if (totalMatches === state.matrix.length) {
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
    currentStreak += 1
  } else {
    startingPlayerId =
      state.playerIds[getPlayerIndex(state, finishingPlayerId) === 0 ? 1 : 0]
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
}
