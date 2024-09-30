import { globalStyle, globalFontFace } from "@vanilla-extract/css"
import { vars } from "./theme.css"

globalFontFace("fibberish", {
  src: 'url("./assets/fonts/Fibberish/fibberish.ttf") format("truetype")',
  fontWeight: "normal",
})

globalStyle("html, body", {
  padding: 0,
  margin: 0,
  fontFamily: vars.font.family,
  background: vars.colors.darkText,
  color: vars.colors.liteText,
  minHeight: "100vh",
  overflow: "hidden",
})

globalStyle("*", {
  boxSizing: "border-box",
})

globalStyle("#root", {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
})

globalStyle(".relative", {
  position: "relative",
})
