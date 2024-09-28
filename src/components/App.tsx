import { useEffect, useState } from "react"
import { PlayerId } from "rune-sdk"
import clsx from "clsx"

import selectSoundAudio from "../assets/select.wav"
import { GameState } from "../logic"
import {
  getCurrentPlayerId,
  getPlayerIndex,
  getPlayerMatchLists,
} from "../logic/utils"
import * as styles from "./app.css"

const selectSound = new Audio(selectSoundAudio)

export function App() {
  const [game, setGame] = useState<GameState>()
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>()

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game)
        setYourPlayerId(yourPlayerId)

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
  }, [])

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return
  }

  // const { matrix, playerIds, currentTurn, playerMatchLists } = game
  const { playerIds, matrix, gameOverResults } = game

  return (
    <>
      <div
        className={clsx(
          styles.board,
          game.currentTurn?.playerId === yourPlayerId
            ? styles.yourTurn
            : styles.notYourTurn
        )}
        data-your-turn={game.currentTurn?.playerId === yourPlayerId}
      >
        {matrix.map((item, index) => (
          <div
            key={item.id}
            className={clsx(styles.matrixItem, styles.match)}
            data-guesser={
              item.show ? `player${getPlayerIndex(game, item.show)}` : ""
            }
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(100)
              Rune.actions.revealItem(index)
            }}
          >
            {item.show && (
              <>
                <span>{item.rank}</span>
                <span>{item.score > 0 ? `+${item.score}` : item.score}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <ul className={styles.playerList}>
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li
              key={playerId}
              className={styles.playerListItem}
              data-player={`${index}`}
              data-your-turn={String(
                playerIds[index] === getCurrentPlayerId(game) &&
                  !gameOverResults
              )}
            >
              <div className="relative">
                <div className={styles.countBadge}>
                  {getPlayerMatchLists(game).find(
                    (ml) => ml.playerId === playerId
                  )?.totalMatches || 0}
                </div>
                <img className={styles.avatar} src={player.avatarUrl} />
                <div className={styles.scoreBadge}>
                  {getPlayerMatchLists(game).find(
                    (ml) => ml.playerId === playerId
                  )?.totalMatchValue || 0}
                </div>
              </div>
              <span>
                {player.displayName}
                {player.playerId === yourPlayerId && <span> (You)</span>}
              </span>
            </li>
          )
        })}
      </ul>
    </>
  )
}
