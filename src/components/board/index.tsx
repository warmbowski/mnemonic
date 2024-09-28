import clsx from "clsx"

import { useAtom } from "jotai"
import { gameStateAtom, yourPlayerIdAtom } from "../../game-state"
import * as styles from "./styles.css"
import { Tile } from "../tile"

export function Board() {
  const [game] = useAtom(gameStateAtom)
  const [yourPlayerId] = useAtom(yourPlayerIdAtom)

  if (!game) {
    return
  }

  return (
    <div
      className={clsx(
        styles.board,
        game.currentTurn?.playerId === yourPlayerId
          ? styles.yourTurn
          : styles.notYourTurn
      )}
      data-your-turn={game.currentTurn?.playerId === yourPlayerId}
    >
      {game.matrix.map((item, index) => (
        <Tile
          key={item.id}
          tile={item}
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(100)
            Rune.actions.revealItem(index)
          }}
        />
      ))}
    </div>
  )
}
