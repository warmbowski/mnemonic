import { useAtom } from "jotai"
import { getCurrentPlayerId, getPlayerMatchLists } from "../../logic/utils"
import {
  gameStateAtom,
  showPlayerMatchesAtom,
  yourPlayerIdAtom,
} from "../../game-state"
import { Pixelify } from "../pixelify"

import * as styles from "./styles.css"

export function Players() {
  const [game] = useAtom(gameStateAtom)
  const [yourPlayerId] = useAtom(yourPlayerIdAtom)
  const [, setShowPlayerMatches] = useAtom(showPlayerMatchesAtom)

  if (!game) {
    return
  }

  return (
    <ul className={styles.playerList}>
      {game.playerIds.map((playerId, index) => {
        const player = Rune.getPlayerInfo(playerId)

        return (
          <li
            key={playerId}
            className={styles.playerListItem}
            data-player={`${index}`}
            data-your-turn={String(
              game.playerIds[index] === getCurrentPlayerId(game) &&
                !game.gameOverResults
            )}
          >
            <div
              className={styles.playerAvatar}
              onClick={() => {
                setShowPlayerMatches((p) => (p ? "" : playerId))
              }}
            >
              <div className={styles.countBadge}>
                {getPlayerMatchLists(game).find(
                  (ml) => ml.playerId === playerId
                )?.totalMatches || 0}
              </div>
              <Pixelify
                src={player.avatarUrl}
                className={styles.avatarImg}
                pixelSize={6}
              />
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
  )
}
