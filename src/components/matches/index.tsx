import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import { Player } from "rune-sdk"

import {
  gameStateAtom,
  messagesAtom,
  showPlayerMatchesAtom,
  yourPlayerIdAtom,
} from "../../game-state"
import * as styles from "./styles.css"
import { getPlayerIndex, getPlayerMatchesById } from "../../logic/utils"
import clsx from "clsx"
import { MUSHROOM_HUNTER_THEME } from "../../constants"

const getClosedDrawerOffset = () => {
  const h = window.innerHeight
  const w = window.innerWidth
  const playersHeight = 90
  const boardHeight = w * 1.2
  const messageHeight = 70
  const maxCloseddrawerHeight = 84
  const minCloseddrawerHeight = 24

  const calc = h - playersHeight - boardHeight - messageHeight
  if (calc < maxCloseddrawerHeight) {
    return minCloseddrawerHeight
  }
  return maxCloseddrawerHeight
}

export function Matches() {
  const [showMatches, setShowMatches] = useAtom(showPlayerMatchesAtom)
  const [game] = useAtom(gameStateAtom)
  const [yourPlayerId] = useAtom(yourPlayerIdAtom)
  const [t] = useAtom(messagesAtom)

  const isSpectator = useMemo(() => yourPlayerId === "", [yourPlayerId])
  const player = useMemo(
    () =>
      Rune.getPlayerInfo(showMatches || yourPlayerId) ||
      ({ displayName: t.spectatorName() } as Player),
    [showMatches, t, yourPlayerId]
  )
  const playerMatches = useMemo(() => {
    return getPlayerMatchesById(game)[showMatches || yourPlayerId] || []
  }, [game, showMatches, yourPlayerId])
  const turnCount = useMemo(
    () =>
      game?.turnHistory.filter(
        (turn) =>
          turn.playerId === showMatches || turn.playerId === yourPlayerId
      ).length || 0,
    [game?.turnHistory, showMatches, yourPlayerId]
  )

  useEffect(() => {
    if (game?.gameOverResults) {
      setShowMatches(yourPlayerId)
    }
  }, [game?.gameOverResults, setShowMatches, yourPlayerId])

  if (!game) {
    return
  }

  const playerIndex = getPlayerIndex(game, showMatches || yourPlayerId)
  const initial = {
    top: isSpectator ? "110vh" : `calc(100vh - ${getClosedDrawerOffset()}px)`,
  }

  return (
    <motion.div
      className={clsx(styles.matchList, `player${playerIndex}`)}
      initial={initial}
      animate={{ top: showMatches ? "30vh" : initial.top }}
    >
      <div
        className={showMatches ? styles.carrotDown : styles.carrotUp}
        onClick={() => setShowMatches(showMatches ? "" : yourPlayerId)}
      >
        ^
      </div>
      <div
        className={styles.heading}
        onClick={() => setShowMatches(showMatches ? "" : yourPlayerId)}
      >
        <div className={styles.playerName}>
          {t.playersBasket(player.displayName)}
        </div>
        <div>
          <div>{t.setsFound(playerMatches.length)}</div>
          <div>{t.inTries(turnCount)}</div>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>
        {showMatches === yourPlayerId
          ? playerMatches.length > 0
            ? t.matchesYou(playerMatches.length)
            : t.noMatchesYou()
          : playerMatches.length > 0
            ? t.matchesThem(player.displayName, playerMatches.length)
            : t.noMatchesThem(player.displayName)}
      </p>
      {game.gameOverResults && (
        <p style={{ textAlign: "center", fontSize: "1.5em" }}>
          {game.gameOverResults[showMatches] === "WON"
            ? t.won()
            : game.gameOverResults[showMatches] === "LOST"
              ? t.lost(player.displayName)
              : t.tie()}
        </p>
      )}
      <div className={styles.matchesContainer}>
        {playerMatches.length > 0 && (
          <>
            <ul className={styles.pairList}>
              {playerMatches.map((match, index) => (
                <li key={index} className={styles.pairItem}>
                  <img
                    src={MUSHROOM_HUNTER_THEME.mushrooms[match.rank]}
                    alt={`Mushroom ${match.rank}`}
                  />
                  <img
                    className={styles.secondImage}
                    src={MUSHROOM_HUNTER_THEME.mushrooms[match.rank]}
                    alt={`Mushroom ${match.rank}`}
                  />
                  <span>{t.value(match.score)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  )
}
