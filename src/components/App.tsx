import { useEffect } from "react"
import { useAtom } from "jotai"

import { gameStateAtom, yourPlayerIdAtom } from "../game-state"
import { Players } from "./players"
import { Board } from "./board"

import selectSoundAudio from "../assets/select.wav"
import { REVERT_REVEALED_TILES_DELAY } from "../constants"
import { Matches } from "./matches"
import { Leaves } from "./leaves"
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
            }, REVERT_REVEALED_TILES_DELAY * 1000)
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
      <Players />
      <Leaves>
        <Board />
      </Leaves>
      <Matches />
    </>
  )
}
