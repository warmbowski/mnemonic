import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useAtom } from "jotai"
import clsx from "clsx"

import { getPlayerIndex } from "../../logic/utils"
import { Item } from "../../logic"
import { gameStateAtom } from "../../game-state"
import * as styles from "./styles.css"
import {
  MATCH_SCORE_ANIMATION_DURATION,
  MUSHROOM_HUNTER_THEME,
} from "../../constants"

export interface TileProps {
  tile: Item
  delayIn?: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Tile({ tile, onClick, delayIn }: TileProps) {
  const [game] = useAtom(gameStateAtom)
  const [completed, setCompleted] = useState(false)
  const tileRef = useRef<HTMLDivElement>(null)

  const coverUrl = useMemo(() => {
    return tile.coverIndex !== undefined
      ? `url(${MUSHROOM_HUNTER_THEME.trees[tile.coverIndex]})`
      : undefined
  }, [tile.coverIndex])

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
      transformTemplate={({ rotate, x, y }) => {
        return `rotateX(${rotate}) translate(${x}, ${y})`
      }}
      initial={{
        transformOrigin: "50% 100%",
        rotate: "90deg",
        y: tile.offsetY,
        x: tile.offsetX,
      }}
      animate={{ rotate: "0deg" }}
      whileTap={{ scale: 1.2 }}
      transition={{
        type: "spring",
        stiffness: 200,
        mass: 1,
        damping: 15,
        delay: delayIn,
      }}
    >
      <div
        className={clsx(styles.cover, { guessed: tile.guessed })}
        style={{
          backgroundImage: coverUrl,
        }}
      />
      {tile.guessed ? (
        <>
          <motion.div
            className={styles.item}
            initial={{
              transform: "rotateX(90deg)",
              backgroundImage: `url("${MUSHROOM_HUNTER_THEME.mushrooms[tile.rank]}")`,
            }}
            animate={{ transform: "rotateX(0deg)" }}
            transition={{
              type: "spring",
              stiffness: 100,
              mass: 0.5,
              damping: 5,
            }}
          />
          {tile.matched && (
            <motion.div
              className={styles.score}
              style={{
                display: completed ? "none" : "block",
              }}
              initial={{
                scale: 1,
                y: 0,
              }}
              animate={{
                scale: 2,
                y: (tileRef.current?.clientHeight || 0) * -1,
              }}
              transition={{
                duration: MATCH_SCORE_ANIMATION_DURATION,
                ease: "linear",
              }}
              onAnimationComplete={() => setCompleted(true)}
            >
              <div
                className={styles.scoreIcon}
                style={{
                  backgroundImage: `url("${MUSHROOM_HUNTER_THEME.scoreIcon}")`,
                }}
              />
              <div className={styles.scoreValue}>
                {tile.score < 0 ? "-" : "+"}${Math.abs(tile.score)}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div
        // className={styles.cover}
        // style={{
        //   backgroundImage: coverUrl,
        // }}
        />
      )}
    </motion.div>
  )
}
