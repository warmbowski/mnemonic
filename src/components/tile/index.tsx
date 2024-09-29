import { getPlayerIndex } from "../../logic/utils"
import { Item } from "../../logic"
import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import * as styles from "./styles.css"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { MATCH_SCORE_ANIMATION_DURATION } from "../../constants"

export interface TileProps {
  tile: Item
  delayIn?: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Tile({ tile, onClick, delayIn }: TileProps) {
  const [game] = useAtom(gameStateAtom)
  const [completed, setCompleted] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tile.id === "0") {
      console.log(tileRef.current?.clientHeight)
    }
  }, [tile.id])

  if (!game) {
    return
  }

  return (
    <motion.div
      ref={tileRef}
      className={styles.tile}
      data-guessed={
        tile.guessed ? `player${getPlayerIndex(game, tile.guessed)}` : ""
      }
      data-matched={
        tile.matched ? `player${getPlayerIndex(game, tile.matched)}` : ""
      }
      onClick={onClick}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 1.2 }}
      transition={{
        type: "spring",
        stiffness: 200,
        mass: 1,
        damping: 15,
        delay: delayIn,
      }}
    >
      {tile.guessed && (
        <>
          <span>{tile.rank}</span>
          {tile.matched && (
            <motion.span
              style={{
                zIndex: 100,
                color: "yellowgreen",
                position: "absolute",
                display: completed ? "none" : "block",
              }}
              initial={{ scale: 1, y: 0 }}
              animate={{
                scale: 2,
                y: (tileRef.current?.clientHeight || 0) * -1,
              }}
              transition={{
                duration: MATCH_SCORE_ANIMATION_DURATION,
                ease: "backOut",
              }}
              onAnimationComplete={() => setCompleted(true)}
            >
              {tile.score > 0 ? `+${tile.score}` : tile.score}
            </motion.span>
          )}
        </>
      )}
    </motion.div>
  )
}
