import { style } from "@vanilla-extract/css"

export const board = style({
  width: "100vw",
  height: "100vw",
  padding: "16px",
  maxWidth: "min(90vh, 600px)",
  pointerEvents: "none",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridAutoRows: "1fr",
  gap: "8px",
})

export const yourTurn = style({
  pointerEvents: "initial",
  selectors: {
    "&:hover": {
      cursor: "pointer",
    },
  },
})

export const notYourTurn = style({
  pointerEvents: "none",
})
