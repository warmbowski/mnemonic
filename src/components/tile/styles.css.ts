import { style, keyframes } from "@vanilla-extract/css"
// import { vars } from "../../theme.css"

export const tile = style({
  width: "100%",
  height: "100%",
  fontSize: "1em",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  selectors: {
    '&[data-guessed^="player"], &[data-matched^="player"]': {
      pointerEvents: "none",
    },
    // '&[data-matched="player0"]': {
    //   color: vars.colors.player0.dark,
    // },
    // '&[data-matched="player1"]': {
    //   color: vars.colors.player1.dark,
    // },
    // '&[data-matched="player2"]': {
    //   color: vars.colors.player2.dark,
    // },
    // '&[data-matched="player3"]': {
    //   color: vars.colors.player3.dark,
    // },
  },
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
      filter: "blur(1px)",
      opacity: 0.5,
    },
  },
})

export const item = style({
  width: "70%",
  height: "70%",
  transformOrigin: "50% 100%",
  backgroundSize: "cover",
  backgroundPosition: "50% 20%",
  backgroundRepeat: "no-repeat",
})

export const score = style({
  zIndex: 100,
  position: "absolute",
  lineHeight: 1,
  color: "black",
})

export const scoreValue = style({
  position: "absolute",
  bottom: "0px",
  textShadow: "black 1px 1px, black -1px -1px, black 1px -1px, black -1px 1px",
  zIndex: 20,
})

export const scoreIconAnimation = keyframes({
  "100%": {
    backgroundPositionX: -160,
  },
})

export const scoring = style({
  width: 32,
  height: 32,
  scale: "50%",
  position: "relative",
  top: "calc(25% - 1em)",
  backgroundPosition: "0 0",
  backgroundRepeat: "no-repeat",
  zIndex: 10,
})

export const scoreIcon = style([
  scoring,
  {
    scale: "50%",
    opacity: 0.7,
    animation: scoreIconAnimation + " 0.8s steps(5) 3",
  },
])

export const negScoreIcon = style([
  scoring,
  {
    scale: "80%",
    opacity: 0.8,
    animation: scoreIconAnimation + " 0.5s steps(5) 3",
  },
])
