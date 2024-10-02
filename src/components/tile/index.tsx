import { getPlayerIndex } from "../../logic/utils"
import { Item } from "../../logic"
import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import * as styles from "./styles.css"
import { motion } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import {
  MATCH_SCORE_ANIMATION_DURATION,
  MUSHROOM_HUNTER_THEME,
} from "../../constants"
import clsx from "clsx"

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
            initial={{
              width: "50%",
              height: "50%",
              transformOrigin: "50% 100%",
              transform: "rotateX(90deg)",
              backgroundImage: `url("${MUSHROOM_HUNTER_THEME.mushrooms[tile.rank]}")`,
              backgroundSize: "cover",
              backgroundPosition: "50% 20%",
              backgroundRepeat: "no-repeat",
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
            <motion.span
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
                ease: "backOut",
              }}
              onAnimationComplete={() => setCompleted(true)}
            >
              {tile.score < 0 ? "-" : "+"}${Math.abs(tile.score)}
            </motion.span>
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
