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
  width: "20vw",
  height: "20v2",
  marginTop: "0",
  marginBottom: "0",
})

export const scoreBadge = style({
  fontSize: "min(14px, 3vw)",
  lineHeight: 1.5,
  minWidth: "1.5em",
  color: vars.colors.darkText,
  background: "lightcoral",
  border: "1px solid darkmagenta",
  borderRadius: "4px",
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
