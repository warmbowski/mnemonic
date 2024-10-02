import clsx from "clsx"

import { useAtom } from "jotai"
import { gameStateAtom, yourPlayerIdAtom } from "../../game-state"
import * as styles from "./styles.css"
import { Tile } from "../tile"
import { MUSHROOM_HUNTER_THEME } from "../../constants"

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
      style={{
        backgroundImage: `url(${MUSHROOM_HUNTER_THEME.ground})`,
        backgroundSize: "50%",
      }}
      data-your-turn={game.currentTurn?.playerId === yourPlayerId}
    >
      {game.matrix.map((item, index) => (
        <Tile
          key={item.id}
          tile={item}
          delayIn={index * 0.05}
          onClick={() => {
            if (navigator.vibrate) navigator.vibrate(100)
            Rune.actions.revealItem(index)
          }}
        />
      ))}
    </div>
  )
}
