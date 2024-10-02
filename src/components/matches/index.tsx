import { useMemo } from "react"
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
    return getPlayerMatchesById(game)[showMatches] || []
  }, [game, showMatches])

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
      initial={{ top: "90vh" }}
      animate={{ top: showMatches ? "30vh" : "90vh" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
        onClick={() => setShowMatches(showMatches ? "" : yourPlayerId)}
      >
        <h2>{`${player.displayName}'s basket`}</h2>
        <h2
          style={{
            cursor: "pointer",
            width: "1em",
            height: "2em",
          }}
        >
          X
        </h2>
      </div>
      <div>
        {playerMatches.length > 0 ? (
          <>
            <p style={{ textAlign: "center" }}>
              {showMatches === yourPlayerId
                ? `You have found ${playerMatches.length} mushrooms in ${turnCount} guesses:`
                : `${player.displayName} has found ${playerMatches.length} mushrooms in ${turnCount} guesses:`}
            </p>
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
        ) : (
          <p style={{ textAlign: "center" }}>
            {showMatches === yourPlayerId
              ? "You haven't found any mushrooms yet!"
              : `${player.displayName} hasn't found any mushrooms yet!`}
          </p>
        )}
      </div>
    </motion.div>
  )
}
