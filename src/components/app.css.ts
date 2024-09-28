import { style } from "@vanilla-extract/css"
import { vars } from "../theme.css"

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

export const matrixItem = style({
  width: "100%",
  height: "100%",
  fontSize: "min(1rem, 3vw)",
  background: vars.colors.board.background,
  border: "1px solid white",
  borderRadius: "5px",
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

export const scoreBadge = style({
  fontSize: "min(14px, 3vw)",
  lineHeight: 1.5,
  minWidth: "1.5em",
  color: vars.colors.darkText,
  background: "lightcoral",
  border: "1px solid darkmagenta",
  borderRadius: "5px",
  position: "relative",
})

export const countBadge = style([
  scoreBadge,
  {
    fontSize: "min(12px, 3vw)",
    color: vars.colors.darkText,
    background: "gold",
    border: "1px solid goldenrod",
    borderRadius: "50%",
    position: "absolute",
    top: "5%",
    right: "5%",
  },
])

export const playerList = style({
  listStyle: "none",
  maxHeight: "10vh",
  fontSize: "min(14px, 3vw)",
  padding: "0",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
})

export const playerListItem = style({
  opacity: 0.5,
  lineHeight: 1.7,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  transition: "opacity 0.2s ease-in-out",
  selectors: {
    '&[data-your-turn="true"]': {
      opacity: 1,
    },
  },
})

export const avatar = style({
  width: "20vw",
  height: "20v2",
  marginTop: "0",
  marginBottom: "0",
})
