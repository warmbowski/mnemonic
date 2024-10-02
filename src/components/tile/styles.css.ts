import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const tile = style({
  width: "100%",
  height: "100%",
  fontSize: "min(1rem, 3vw)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  selectors: {
    '&[data-guessed^="player"]': {
      borderWidth: "4px",
      pointerEvents: "none",
      zIndex: 10,
    },
    '&[data-matched^="player"]': {
      pointerEvents: "none",
    },
    // '&[data-guessed="player0"]': {
    //   borderColor: vars.colors.player0.lite,
    // },
    // '&[data-guessed="player1"]': {
    //   borderColor: vars.colors.player1.lite,
    // },
    '&[data-matched="player0"]': {
      color: vars.colors.player0.dark,
    },
    '&[data-matched="player1"]': {
      color: vars.colors.player1.dark,
    },
  },
})

export const score = style({
  zIndex: 100,
  position: "absolute",
  lineHeight: 1,
  // backgroundColor: "rgba(255, 255, 255, 0.7)",
  // boxShadow:
  //   "-2px 0 0 0 rgba(255, 255, 255, 0.7), 2px 0 0 0 rgba(255, 255, 255, 0.7), 0 -2px 0 0 rgba(255, 255, 255, 0.7), 0 2px 0 0 rgba(255, 255, 255, 0.7)",
})

export const cover = style({
  width: "100%",
  height: "100%",
  backgroundPosition: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  position: "absolute",
  opacity: 1,
  transition: "opacity 0.5s",
  selectors: {
    "&.guessed": {
      opacity: 0.5,
    },
  },
})
