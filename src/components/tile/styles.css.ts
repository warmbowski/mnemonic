import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const tile = style({
  width: "100%",
  height: "100%",
  fontSize: "min(1rem, 3vw)",
  background: vars.colors.board.background,
  border: "1px solid white",
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  selectors: {
    '&[data-guessed^="player"]': {
      borderWidth: "4px",
      pointerEvents: "none",
    },
    '&[data-matched^="player"]': {
      pointerEvents: "none",
    },
    '&[data-guessed="player0"]': {
      // backgroundColor: vars.colors.player0.med,
      borderColor: vars.colors.player0.lite,
      // color: vars.colors.player0.text,
    },
    '&[data-guessed="player1"]': {
      // backgroundColor: vars.colors.player1.med,
      borderColor: vars.colors.player1.lite,
      // color: vars.colors.player1.text,
    },
    '&[data-matched="player0"]': {
      backgroundColor: vars.colors.player0.med,
      borderColor: vars.colors.player0.lite,
      color: vars.colors.player0.text,
    },
    '&[data-matched="player1"]': {
      backgroundColor: vars.colors.player1.med,
      borderColor: vars.colors.player1.lite,
      color: vars.colors.player1.text,
    },
  },
})
