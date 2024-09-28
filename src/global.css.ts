import { globalStyle } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontFamily: vars.font.family,
  background: vars.colors.darkText,
  color: vars.colors.liteText,
  minHeight: "100vh",
})

globalStyle("*", {
  boxSizing: "border-box",
})

globalStyle("#root", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
})

globalStyle(".relative", {
  position: "relative",
})
