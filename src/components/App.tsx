import { useEffect } from "react"
import { useAtom } from "jotai"

import { gameStateAtom, yourPlayerIdAtom } from "../game-state"
import { PlayerList } from "./player-list"
import { Board } from "./board"

import selectSoundAudio from "../assets/select.wav"
const selectSound = new Audio(selectSoundAudio)

export function App() {
  const [game, setGame] = useAtom(gameStateAtom)
  const [, setYourPlayerId] = useAtom(yourPlayerIdAtom)

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId || "")

        if (action && action.name === "revealItem") {
          selectSound.play()
          if (game.currentTurn?.guess[0] === null) {
            setTimeout(() => {
              Rune.actions.revertUnmatchedItems(
                game.turnHistory[game.turnHistory.length - 1]
              )
            }, 3000)
          }
        }
      },
    })
  }, [setGame, setYourPlayerId])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  return (
    <>
      <PlayerList />
      <Board />
    </>
  )
}
