import { GameStateWithPersisted, PlayerId } from "rune-sdk"

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

export interface PersonalBests {
  totalGames: number
  totalMatches: number
  totalTurns: number
  totalEarnings: number
  highestEarnings: number
  highestStreak: number
  fewestTurns: number
}

export interface PersistedDataV1 {
  version: number
  onboarded?: boolean
  personalBests: Array<PersonalBests | null>
}

export enum GameType {
  Solo,
  Duo,
  Trio,
  Quad,
}

export type GameStateWithPersited = GameStateWithPersisted<
  GameState,
  PersistedDataV1
>
