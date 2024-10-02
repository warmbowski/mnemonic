import { useAtom } from "jotai"
import clsx from "clsx"
import { motion } from "framer-motion"
import { getCurrentPlayerId, getPlayerMatchLists } from "../../logic/utils"
import {
  gameStateAtom,
  showPlayerMatchesAtom,
  yourPlayerIdAtom,
} from "../../game-state"
import { Pixelify } from "../pixelify"

import * as styles from "./styles.css"
import { MUSHROOM_HUNTER_THEME } from "../../constants"

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
        const yourTurn =
          playerId === getCurrentPlayerId(game) && !game.gameOverResults
        const init = { opacity: 0.5, scale: 0.6 }
        const end = { opacity: 1, scale: 0.8 }

        return (
          <li
            key={playerId}
            className={styles.playerListItem}
            data-player={`${index}`}
            data-your-turn={yourTurn}
            onClick={() => {
              setShowPlayerMatches((p) => (p ? "" : playerId))
            }}
          >
            <motion.div
              className={styles.playerAvatar}
              initial={init}
              animate={yourTurn ? end : init}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
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
                pixelSize={5}
              />
            </motion.div>
            <div
              className={clsx(
                styles.scoreBadge,
                { player0: index === 0 },
                { player1: index === 1 },
                { player2: index === 2 },
                { player3: index === 3 }
              )}
            >
              {getPlayerMatchLists(game).find((ml) => ml.playerId === playerId)
                ?.totalMatchValue || 0}
            </div>
            <div>
              {player.displayName}
              {player.playerId === yourPlayerId && (
                <img
                  src={MUSHROOM_HUNTER_THEME.youIcon}
                  className={styles.youIcon}
                />
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
