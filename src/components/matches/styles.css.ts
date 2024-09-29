import { style } from "@vanilla-extract/css"

export const matchList = style({
  width: "100vw",
  height: "70vh",
  position: "absolute",
  bottom: "-100vh",
  zIndex: 100,
  background: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  transition: "bottom 0.2s ease-in-out",
})
