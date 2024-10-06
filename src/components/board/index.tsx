import clsx from "clsx"
import { motion } from "framer-motion"
import { useAtom } from "jotai"

import { gameStateAtom, messagesAtom, yourPlayerIdAtom } from "../../game-state"
import * as styles from "./styles.css"
import { Tile } from "../tile"
import { useMemo } from "react"

const grassData = [...Array(100).keys()].map((k) => ({
  key: String(k),
  top: Math.random() * 90 + 5 + "%",
  left: Math.random() * 90 + 5 + "%",
  scale: Math.random() * 1 + 1,
}))

export function Board() {
  const [game] = useAtom(gameStateAtom)
  const [yourPlayerId] = useAtom(yourPlayerIdAtom)
  const [t] = useAtom(messagesAtom)

  const isPlayer = useMemo(() => {
    return game?.playerIds.some((id) => id === yourPlayerId)
  }, [game?.playerIds, yourPlayerId])

  if (!game) {
    return
  }

  return (
    <>
      <div className={styles.background}>
        {grassData.map(({ key, ...rest }) => {
          return <GrassTuft key={key} {...rest} />
        })}
      </div>
      <div
        className={clsx(
          styles.board,
          game.currentTurn?.playerId === yourPlayerId
            ? styles.yourTurn
            : styles.notYourTurn
        )}
        style={{
          backgroundSize: "50%",
        }}
        data-your-turn={game.currentTurn?.playerId === yourPlayerId}
      >
        {game.matrix.map((item, index) => (
          <Tile
            key={`${game.signature}-${item.id}`}
            tile={item}
            delayIn={index * 0.05}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(100)
              Rune.actions.revealItem(index)
            }}
          />
        ))}
      </div>
      {isPlayer && game.currentTurn?.playerId === yourPlayerId && (
        <motion.h3
          key="your-turn-message"
          className={styles.message}
          initial={{
            height: 0,
            width: 0,
            backgroundColor: "goldenrod",
          }}
          animate={{
            height: "auto",
            width: "100%",
          }}
        >
          {game.currentTurn.streak > 0
            ? t.onAStreak(game.currentTurn.streak)
            : t.yourTurn()}
        </motion.h3>
      )}
      {isPlayer && game.currentTurn?.playerId !== yourPlayerId && (
        <motion.h3
          key="not-your-turn-message"
          className={styles.notYourTurnMessage}
          initial={{
            height: 0,
            width: 0,
          }}
          animate={{
            height: "auto",
            width: "100%",
          }}
        >
          {t.waitYourTurn()}
        </motion.h3>
      )}
    </>
  )
}

interface GrassTuftProps {
  top: string
  left: string
  scale: number
}
function GrassTuft({ top, left, scale }: GrassTuftProps) {
  return (
    <img
      src="themes/mushroom-hunter/grass-tufts.png"
      style={{
        position: "absolute",
        top,
        left,
        scale,
      }}
      onError={(e) => {
        e.currentTarget.src = ""
        e.currentTarget.remove()
      }}
      alt=""
    />
  )
}
