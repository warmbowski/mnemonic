import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const board = style({
  width: "95vw",
  height: "114vw",
  padding: "8px",
  pointerEvents: "none",
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gridAutoRows: "1fr",
  backgroundColor: vars.colors.board.background,
  boxShadow:
    "-6px 0 0 0 #6e2727, 6px 0 0 0 #6e2727, 0 -6px 0 0 #6e2727, 0 6px 0 0 #6e2727",
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
