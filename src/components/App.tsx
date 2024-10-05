import { useEffect, useLayoutEffect } from "react"
import { useAtom } from "jotai"

import {
  gameStateAtom,
  yourPlayerIdAtom,
  showPlayerMatchesAtom,
  messagesAtom,
} from "../game-state"
import { Players } from "./players"
import { Board } from "./board"

import {
  MUSHROOM_HUNTER_THEME,
  REVERT_REVEALED_TILES_DELAY,
} from "../constants"
import { Matches } from "./matches"
import { Leaves } from "./leaves"
import { usePreloadAssets } from "./preload-theme"
import { getPlayerMatchLists } from "../logic/utils"
const selectSound = new Audio(MUSHROOM_HUNTER_THEME.audio.reveal)
const negScoreSound = new Audio(MUSHROOM_HUNTER_THEME.audio.negScore)
const posScoreSound = new Audio(MUSHROOM_HUNTER_THEME.audio.posScore)
const yourTurnSound = new Audio(MUSHROOM_HUNTER_THEME.audio.yourTurn)
const revertSound = new Audio(MUSHROOM_HUNTER_THEME.audio.revert)

export function App() {
  const [game, setGame] = useAtom(gameStateAtom)
  const [yourPlayerId, setYourPlayerId] = useAtom(yourPlayerIdAtom)
  const [showMatches, setShowMatches] = useAtom(showPlayerMatchesAtom)
  const [, setT] = useAtom(messagesAtom)

  usePreloadAssets()

  useLayoutEffect(() => {
    const retreiveAndSetMessages = async (lang: "es") => {
      const { default: messages } = await import(`../i18n/${lang}.ts`)
      return setT(messages)
    }

    if (navigator.language.startsWith("es")) {
      retreiveAndSetMessages("es")
    }
  }, [setT])

  useEffect(() => {
    if (showMatches !== "" && !game?.playerIds.includes(showMatches)) {
      setShowMatches("")
    }
  }, [game?.playerIds, setShowMatches, showMatches])

  useEffect(() => {
    // game state related rune actions called only from current player's game
    if (
      game &&
      game.currentTurn &&
      game.currentTurn.playerId === yourPlayerId
    ) {
      // at turn end
      if (game.currentTurn && game.currentTurn.guess[1] !== null) {
        const turn = game.currentTurn
        if (!turn.isMatch) {
          setTimeout(() => {
            Rune.actions.revertUnmatchedItems(turn)
          }, REVERT_REVEALED_TILES_DELAY * 1000)
        }
        Rune.actions.advanceTurn()
      }

      // check if game is over
      const totalMatches = getPlayerMatchLists(game).reduce(
        (acc, player) => acc + player.totalMatches,
        0
      )
      if (totalMatches === game.matrix.length / 2) {
        Rune.actions.endGame()
      }
    }
  }, [game, yourPlayerId])

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId || "")

        if (action && action.name === "revealItem") {
          if (game.currentTurn && game.currentTurn.isMatch) {
            if ((game.currentTurn.matchValue ?? 0) < 0) {
              negScoreSound.play()
            } else {
              posScoreSound.play()
            }
          } else {
            selectSound.play()
          }
        }
        if (action && action.name === "revertUnmatchedItems") {
          revertSound.play()
        }
        if (action && action.name === "advanceTurn") {
          const lastTurnPlayerId =
            game.turnHistory.length > 0
              ? game.turnHistory[game.turnHistory.length - 1].playerId
              : ""
          if (
            lastTurnPlayerId !== yourPlayerId &&
            game.currentTurn?.playerId === yourPlayerId
          ) {
            yourTurnSound.play()
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
