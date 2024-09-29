import { useAtom } from "jotai"
import { gameStateAtom, showPlayerMatchesAtom } from "../../game-state"
import * as styles from "./styles.css"
import { getPlayerMatchesById } from "../../logic/utils"
import { Tile } from "../tile"
import { useMemo } from "react"

export function Matches() {
  const [showMatches, setShowMatches] = useAtom(showPlayerMatchesAtom)
  const [game] = useAtom(gameStateAtom)
  const playerMatches = useMemo(() => {
    return getPlayerMatchesById(game)[showMatches] || []
  }, [game, showMatches])

  if (!game) {
    return
  }

  return (
    <div
      className={styles.matchList}
      style={{ bottom: showMatches ? 0 : undefined }}
    >
      <h1>Matches</h1>
      <p>Player: {showMatches}</p>
      <button onClick={() => setShowMatches("")}>Close</button>

      {playerMatches.map((tile, index) => {
        return <Tile key={index} tile={tile} />
      })}
    </div>
  )
}
