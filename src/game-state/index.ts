import { atom } from "jotai"
import { PlayerId } from "rune-sdk"
import { GameState } from "../logic"

export const yourPlayerIdAtom = atom<PlayerId>("")
export const gameStateAtom = atom<GameState>()
