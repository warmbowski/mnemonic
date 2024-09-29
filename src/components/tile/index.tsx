import clsx from "clsx"
import { getPlayerIndex } from "../../logic/utils"
import { Item } from "../../logic"
import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import * as styles from "./styles.css"
import { motion } from "framer-motion"

export interface TileProps {
  tile: Item
  delayIn?: number
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Tile({ tile, onClick, delayIn }: TileProps) {
  const [game] = useAtom(gameStateAtom)

  if (!game) {
    return
  }

  return (
    <motion.div
      className={clsx(styles.tile, styles.match)}
      data-guesser={tile.show ? `player${getPlayerIndex(game, tile.show)}` : ""}
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
      {tile.show && (
        <>
          <span>{tile.rank}</span>
          <span>{tile.score > 0 ? `+${tile.score}` : tile.score}</span>
        </>
      )}
    </motion.div>
  )
}
