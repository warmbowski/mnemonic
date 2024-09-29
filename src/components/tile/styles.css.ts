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
    '&[data-guesser^="player"]': {
      borderWidth: "4px",
      pointerEvents: "none",
    },
    '&[data-guesser="player0"]': {
      backgroundColor: vars.colors.player0.med,
      borderColor: vars.colors.player0.dark,
      color: vars.colors.player0.text,
    },
    '&[data-guesser="player1"]': {
      backgroundColor: vars.colors.player1.med,
      borderColor: vars.colors.player1.dark,
      color: vars.colors.player1.text,
    },
  },
})

export const match = style({
  // replace iwth lower opacity when match logic
  // is in place
  opacity: 1,
})
