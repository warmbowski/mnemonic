import { useEffect, useState } from "react"
import { PlayerId } from "rune-sdk"

import selectSoundAudio from "../assets/select.wav"
import { GameState } from "../logic"
import {
  getCurrentPlayerId,
  getPlayerIndex,
  getPlayerMatchLists,
} from "../logic/actions"

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
        id="board"
        className={
          game.currentTurn?.playerId === yourPlayerId ? "your-turn" : ""
        }
      >
        {matrix.map((card, index) => (
          <div
            className={[
              "card",
              card.show ? `player-${getPlayerIndex(game, card.show)}` : "",
            ].join(" ")}
            key={card.id}
            data-card={card.rank}
            onClick={() => {
              navigator.vibrate(100)
              Rune.actions.revealItem(index)
            }}
          >
            {card.show && (
              <>
                <span>{card.rank}</span>
                <span>{card.score > 0 ? `+${card.score}` : card.score}</span>
              </>
            )}
          </div>
        ))}
      </div>
      <ul id="playersSection">
        {playerIds.map((playerId, index) => {
          const player = Rune.getPlayerInfo(playerId)

          return (
            <li
              key={playerId}
              data-player={`${index}`}
              data-your-turn={String(
                playerIds[index] === getCurrentPlayerId(game) &&
                  !gameOverResults
              )}
            >
              <div style={{ position: "relative" }}>
                <div className="count-badge">
                  {getPlayerMatchLists(game).find(
                    (ml) => ml.playerId === playerId
                  )?.totalMatches || 0}
                </div>
                <img src={player.avatarUrl} />
                <div className="score-badge">
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
