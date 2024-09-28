import { style } from "@vanilla-extract/css"

export const board = style({
  width: "90vw",
  height: "90vw",
  padding: "16px",
  maxWidth: "min(90vh, 600px)",
  pointerEvents: "none",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)",
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
