import { GameState, Item } from "../logic"

interface MatrixConfig {
  [-30]: number
  [10]: number
  [15]: number
  [20]: number
  [25]: number
}

// initialize game functions
export function createMatrix(config: MatrixConfig) {
  const uniqueItems = Object.entries(config).reduce<Omit<Item, "id">[]>(
    (acc, [score, count]) => {
      const list = []
      for (let i = 0; i < count; i++) {
        list.push({
          rank: `Item-${acc.length + i + 1}`,
          score: Number(score),
          guessed: "",
          matched: "",
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
