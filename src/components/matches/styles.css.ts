import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const matchList = style({
  width: "calc(100vw - 12px)",
  height: "70vh",
  position: "absolute",
  zIndex: 100,
  color: "#000",
  padding: "8px 16px",
  transition: "bottom 0.2s ease-in-out",
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

export const carrotUp = style({
  fontSize: "40px",
  height: 24,
  position: "absolute",
  top: "4px",
  right: "50%",
  transition: "transform 0.2s ease-in-out",
})

export const carrotDown = style([
  carrotUp,
  {
    transform: "rotate(180deg)",
  },
])

export const heading = style({
  display: "flex",
  cursor: "pointer",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "8px",
})

export const pairList = style({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "4px",
  selectors: {},
})

export const pairItem = style({
  margin: "4px",
  padding: "4px",
  border: `1px solid ${vars.colors.darkText}`,
  borderRadius: "4px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "4px",
  position: "relative",
})

export const image = style({
  position: "relative",
})

export const secondImage = style({
  position: "absolute",
  top: "8px",
  right: "8px",
})
