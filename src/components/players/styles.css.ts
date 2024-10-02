import { style } from "@vanilla-extract/css"
import { vars } from "../../theme.css"

export const playerList = style({
  listStyle: "none",
  fontSize: "min(14px, 3vw)",
  padding: "0",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  height: "12vh",
  marginBottom: 6,
})

export const playerListItem = style({
  lineHeight: 1.7,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  alignItems: "center",
  textAlign: "center",
})

export const playerAvatar = style({
  position: "relative",
  cursor: "pointer",
})

export const avatarImg = style({
  width: "15vw",
  marginTop: "0",
  marginBottom: "0",
})

export const youIcon = style({
  width: "1em",
  height: "1em",
})

export const scoreBadge = style({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 2px",
  width: "100%",
  marginBottom: "2px",
  fontSize: "1.2em",
  lineHeight: 1.2,
  minWidth: "1.2em",
  color: vars.colors.darkText,
  background: vars.colors.liteText,
  boxShadow:
    "-4px 0 0 0 darkmagenta, 4px 0 0 0 darkmagenta, 0 -4px 0 0 darkmagenta, 0 4px 0 0 darkmagenta",
  selectors: {
    "&.player0": {
      background: vars.colors.player0.lite,
      boxShadow: `-4px 0 0 0 ${vars.colors.player0.dark}, 4px 0 0 0 ${vars.colors.player0.dark}, 0 -4px 0 0 ${vars.colors.player0.dark}, 0 4px 0 0 ${vars.colors.player0.dark}`,
    },
    "&.player1": {
      background: vars.colors.player1.lite,
      boxShadow: `-4px 0 0 0 ${vars.colors.player1.dark}, 4px 0 0 0 ${vars.colors.player1.dark}, 0 -4px 0 0 ${vars.colors.player1.dark}, 0 4px 0 0 ${vars.colors.player1.dark}`,
    },
    "&.player2": {
      background: vars.colors.player2.lite,
      boxShadow: `-4px 0 0 0 ${vars.colors.player2.dark}, 4px 0 0 0 ${vars.colors.player2.dark}, 0 -4px 0 0 ${vars.colors.player2.dark}, 0 4px 0 0 ${vars.colors.player2.dark}`,
    },
    "&.player3": {
      background: vars.colors.player3.lite,
      boxShadow: `-4px 0 0 0 ${vars.colors.player3.dark}, 4px 0 0 0 ${vars.colors.player3.dark}, 0 -4px 0 0 ${vars.colors.player3.dark}, 0 4px 0 0 ${vars.colors.player3.dark}`,
    },
  },
})

export const countBadge = style({
  fontSize: "1.2em",
  lineHeight: 1,
  minWidth: "1.2em",
  color: vars.colors.darkText,
  background: "gold",
  boxShadow: "-1px 0 0 0 gold, 1px 0 0 0 gold, 0 -1px 0 0 gold, 0 1px 0 0 gold",
  position: "absolute",
  top: "5%",
  right: "5%",
})
