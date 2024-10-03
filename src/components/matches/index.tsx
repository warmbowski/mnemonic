import { useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import {
  gameStateAtom,
  showPlayerMatchesAtom,
  yourPlayerIdAtom,
} from "../../game-state"
import * as styles from "./styles.css"
import { getPlayerIndex, getPlayerMatchesById } from "../../logic/utils"
import clsx from "clsx"
import { MUSHROOM_HUNTER_THEME } from "../../constants"

export function Matches() {
  const [showMatches, setShowMatches] = useAtom(showPlayerMatchesAtom)
  const [game] = useAtom(gameStateAtom)
  const [yourPlayerId] = useAtom(yourPlayerIdAtom)
  const player = Rune.getPlayerInfo(showMatches || yourPlayerId)
  const playerMatches = useMemo(() => {
    return getPlayerMatchesById(game)[showMatches || yourPlayerId] || []
  }, [game, showMatches, yourPlayerId])

  useEffect(() => {
    if (game?.gameOverResults) {
      setShowMatches(yourPlayerId)
    }
  }, [game?.gameOverResults, setShowMatches, yourPlayerId])

  if (!game) {
    return
  }

  const turnCount = game.turnHistory.filter(
    (turn) => turn.playerId === yourPlayerId
  ).length
  const playerIndex = getPlayerIndex(game, showMatches || yourPlayerId)

  return (
    <motion.div
      className={clsx(styles.matchList, `player${playerIndex}`)}
      initial={{ top: "calc(100vh - 84px)" }}
      animate={{ top: showMatches ? "30vh" : "calc(100vh - 84px)" }}
    >
      <div
        className={styles.heading}
        onClick={() => setShowMatches(showMatches ? "" : yourPlayerId)}
      >
        <h2>{`${player.displayName}'s basket`}</h2>
        <div>
          <div>{playerMatches.length} set found</div>
          <div>in {turnCount} tries</div>
        </div>
        <div className={showMatches ? styles.carrotDown : styles.carrotUp}>
          ^
        </div>
      </div>
      <p style={{ textAlign: "center" }}>
        {showMatches === yourPlayerId
          ? playerMatches.length > 0
            ? `You have found ${playerMatches.length} mushroom sets.`
            : `You haven't found any mushroom sets yet!`
          : playerMatches.length > 0
            ? `${player.displayName} has found ${playerMatches.length} mushroom sets.`
            : `${player.displayName} hasn't found any mushroom sets yet!`}
      </p>
      {game.gameOverResults && (
        <p style={{ textAlign: "center", fontSize: "1.5em" }}>
          {game.gameOverResults[showMatches] === "WON"
            ? "You won the game!"
            : game.gameOverResults[showMatches] === "LOST"
              ? `${player.displayName} won the game!`
              : "It's a tie!"}
        </p>
      )}
      <div>
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
                  <span>
                    Value: {match.score < 0 ? "-" : "+"}${Math.abs(match.score)}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </motion.div>
  )
}
