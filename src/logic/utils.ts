import { PlayerId } from "rune-sdk"
import { GameStateWithPersited } from "../logic/types"
import { MUSHROOM_HUNTER_THEME } from "../constants"
import { Item } from "./types"

interface MatrixConfig {
  [-20]: number
  [10]: number
  [15]: number
  [20]: number
  [25]: number
  [30]: number
  [35]: number
  [40]: number
}

// initialize game functions
export function createMatrix(config: MatrixConfig) {
  const uniqueItems = shuffleMatrix(Object.entries(config)).reduce<
    Omit<Item, "id" | "index">[]
  >((acc, [score, count]) => {
    const list = []
    for (let i = 0; i < count; i++) {
      list.push({
        rank: acc.length + i,
        color: `color${i}` as Item["color"],
        score: Number(score),
        guessed: "",
        matched: "",
        multiplier: 1,
      })
    }
    return [...acc, ...list]
  }, [])

  return uniqueItems.concat(uniqueItems).map((item, index) => ({
    id: `${index}`,
    index,
    ...item,
    offsetY: `${Math.floor(Math.random() * 25) * (Math.random() < 0.5 ? -1 : 1)}%`,
    offsetX: `${Math.floor(Math.random() * 35) * (Math.random() < 0.5 ? -1 : 1)}%`,
    coverIndex: Math.floor(
      Math.random() * MUSHROOM_HUNTER_THEME.images.trees.length
    ),
  }))
}

export function shuffleMatrix<T>(list: T[]) {
  // based on Fisher-Yates shuffle algorithm
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

// utility functions
export function getPlayerIndex(
  state: GameStateWithPersited | null,
  playerId: string
) {
  if (!state) {
    return -1
  }

  return state.playerIds.findIndex((id) => id === playerId)
}

export function getCurrentPlayerId(state: GameStateWithPersited) {
  return state.currentTurn?.playerId || ""
}

export function getNextPlayerId(state: GameStateWithPersited) {
  const currentPlayerIndex = getPlayerIndex(state, getCurrentPlayerId(state))
  const nextPlayerIndex = (currentPlayerIndex + 1) % state.playerIds.length
  return state.playerIds[nextPlayerIndex]
}

export function getPlayerMatchLists(state?: GameStateWithPersited) {
  if (!state) {
    return []
  }

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

export function getPlayerMatchesById(state?: GameStateWithPersited) {
  if (!state) {
    return {}
  }

  const init = state.playerIds.reduce<Record<PlayerId, Item[]>>((acc, pId) => {
    acc[pId] = []
    return acc
  }, {})

  return state.turnHistory.reduce((acc, turn) => {
    if (turn.isMatch) {
      if (!acc[turn.playerId]) {
        acc[turn.playerId] = []
      }

      acc[turn.playerId].push(turn.guess[0] as Item)
    }
    return acc
  }, init)
}
