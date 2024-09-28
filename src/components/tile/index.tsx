import clsx from "clsx"
import { getPlayerIndex } from "../../logic/utils"
import { Item } from "../../logic"
import { useAtom } from "jotai"
import { gameStateAtom } from "../../game-state"
import * as styles from "./styles.css"

export interface TileProps {
  tile: Item
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function Tile({ tile, onClick }: TileProps) {
  const [game] = useAtom(gameStateAtom)

  if (!game) {
    return
  }

  return (
    <div
      className={clsx(styles.tile, styles.match)}
      data-guesser={tile.show ? `player${getPlayerIndex(game, tile.show)}` : ""}
      onClick={onClick}
    >
      {tile.show && (
        <>
          <span>{tile.rank}</span>
          <span>{tile.score > 0 ? `+${tile.score}` : tile.score}</span>
        </>
      )}
    </div>
  )
}
