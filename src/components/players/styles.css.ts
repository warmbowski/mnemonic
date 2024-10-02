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

export const playerAvatar = style({
  position: "relative",
  cursor: "pointer",
})

export const avatarImg = style({
  width: "15vw",
  marginTop: "0",
  marginBottom: "0",
})

export const scoreBadge = style({
  fontSize: "1.2em",
  lineHeight: 1.2,
  minWidth: "1.2em",
  color: vars.colors.darkText,
  background: vars.colors.liteText,
  boxShadow:
    "-4px 0 0 0 darkmagenta, 4px 0 0 0 darkmagenta, 0 -4px 0 0 darkmagenta, 0 4px 0 0 darkmagenta",
  position: "relative",
  selectors: {
    "&.player0": {
      background: vars.colors.player0.lite,
      boxShadow: `-4px 0 0 0 ${vars.colors.player0.dark}, 4px 0 0 0 ${vars.colors.player0.dark}, 0 -4px 0 0 ${vars.colors.player0.dark}, 0 4px 0 0 ${vars.colors.player0.dark}`,
    },
  },
})

export const countBadge = style([
  scoreBadge,
  {
    fontSize: "1.2em",
    lineHeight: 1,
    minWidth: "1.2em",
    color: vars.colors.darkText,
    background: "gold",
    boxShadow:
      "-1px 0 0 0 gold, 1px 0 0 0 gold, 0 -1px 0 0 gold, 0 1px 0 0 gold",
    position: "absolute",
    top: "5%",
    right: "5%",
  },
])
