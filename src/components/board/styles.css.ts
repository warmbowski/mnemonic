import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const background = style({
  position: "absolute",
  width: "95vw",
  height: "114vw",
  padding: "8px",
  backgroundColor: vars.colors.board.background,
  "@media": {
    "(min-aspect-ratio: 0.67)": {
      height: "104vw",
    },
  },
})

export const board = style([
  background,
  {
    position: "static",
    width: "95vw",
    height: "114vw",
    padding: "8px",
    pointerEvents: "none",
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridAutoRows: "1fr",
    backgroundColor: "transparent",
    boxShadow:
      "-6px 0 0 0 #6e2727, 6px 0 0 0 #6e2727, 0 -6px 0 0 #6e2727, 0 6px 0 0 #6e2727",
  },
])

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

export const message = style({
  marginLeft: "auto",
  marginRight: "auto",
  padding: "4px",
  textAlign: "center",
  color: "#6e2727",
  overflow: "hidden",
  backgroundColor: "goldenrod",
  boxShadow:
    "-6px 0 0 0 #6e2727, 6px 0 0 0 #6e2727, 0 -6px 0 0 #6e2727, 0 6px 0 0 #6e2727",
})
