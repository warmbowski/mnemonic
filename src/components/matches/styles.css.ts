import { style, keyframes } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const matchList = style({
  width: "calc(100vw - 12px)",
  height: "70vh",
  position: "absolute",
  zIndex: 100,
  color: "#000",
  padding: "8px 16px",
  transition: "bottom 0.2s ease-in-out",
  background: vars.colors.player0.lite,
  boxShadow: `-6px 0 0 0 ${vars.colors.player0.dark}, 6px 0 0 0 ${vars.colors.player0.dark}, 0 -6px 0 0 ${vars.colors.player0.dark}, 0 6px 0 0 ${vars.colors.player0.dark}`,
  selectors: {
    "&.player0": {
      background: vars.colors.player0.lite,
      boxShadow: `-6px 0 0 0 ${vars.colors.player0.dark}, 6px 0 0 0 ${vars.colors.player0.dark}, 0 -6px 0 0 ${vars.colors.player0.dark}, 0 6px 0 0 ${vars.colors.player0.dark}`,
    },
    "&.player1": {
      background: vars.colors.player1.lite,
      boxShadow: `-6px 0 0 0 ${vars.colors.player1.dark}, 6px 0 0 0 ${vars.colors.player1.dark}, 0 -6px 0 0 ${vars.colors.player1.dark}, 0 6px 0 0 ${vars.colors.player1.dark}`,
    },
    "&.player2": {
      background: vars.colors.player2.lite,
      boxShadow: `-6px 0 0 0 ${vars.colors.player2.dark}, 6px 0 0 0 ${vars.colors.player2.dark}, 0 -6px 0 0 ${vars.colors.player2.dark}, 0 6px 0 0 ${vars.colors.player2.dark}`,
    },
    "&.player3": {
      background: vars.colors.player3.lite,
      boxShadow: `-6px 0 0 0 ${vars.colors.player3.dark}, 6px 0 0 0 ${vars.colors.player3.dark}, 0 -4px 0 0 ${vars.colors.player3.dark}, 0 4px 0 0 ${vars.colors.player3.dark}`,
    },
  },
})

export const matchesContainer = style({
  height: "50vh",
  paddingBottom: 16,
  overflowY: "scroll",
})

export const carrotUp = style({
  width: "calc(100% - 16px)",
  fontSize: "40px",
  height: 20,
  cursor: "pointer",
  position: "absolute",
  textAlign: "center",
  transition: "transform 0.2s ease-in-out",
})

export const carrotDown = style([
  carrotUp,
  {
    transform: "rotate(180deg) translateY(50%)",
  },
])

export const heading = style({
  fontSize: "1em",
  height: 84,
  marginTop: 20,
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "8px",
})

export const playerName = style({
  fontSize: "1.5em",
  fontWeight: "bold",
})

export const pairList = style({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "4px",
})

export const pairItem = style({
  margin: "4px",
  padding: "4px",
  border: `2px solid black`,
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  position: "relative",
  selectors: {
    "&.player0": {
      borderColor: vars.colors.player0.dark,
    },
    "&.player1": {
      borderColor: vars.colors.player1.dark,
    },
    "&.player2": {
      borderColor: vars.colors.player2.dark,
    },
    "&.player3": {
      borderColor: vars.colors.player3.dark,
    },
  },
})

export const matchAnimation = keyframes({
  "100%": {
    backgroundPositionX: -256,
  },
})

const badMatch = style({
  position: "absolute",
  top: 0,
  width: 32,
  height: 32,
  zIndex: -5,
  opacity: 0.5,
  backgroundPosition: "0 0",
  backgroundRepeat: "no-repeat",
  backgroundBlendMode: "overlay",
})

export const badMatch1 = style([
  badMatch,
  {
    left: "calc(50% - 28px)",
    animation: `${matchAnimation} 1s steps(8) infinite`,
  },
])

export const badMatch2 = style([
  badMatch,
  {
    left: "calc(50% - 4px)",
    animation: `${matchAnimation} 1s steps(8) infinite`,
    animationDelay: "0.8s",
  },
])

export const image = style({
  position: "relative",
  left: "calc(50% - 28px)",
})

export const secondImage = style({
  position: "absolute",
  top: 8,
  left: "calc(50% - 4px)",
})

export const multiplier = style({
  color: "#ea4f36",
})
