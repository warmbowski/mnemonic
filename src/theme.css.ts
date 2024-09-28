import { createGlobalTheme } from "@vanilla-extract/css"

export function getContrastYIQ(hexcolor: string) {
  const r = parseInt(hexcolor.substring(1, 3), 16)
  const g = parseInt(hexcolor.substring(3, 5), 16)
  const b = parseInt(hexcolor.substring(5, 7), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#333" : "#e6e6e6"
}

export const vars = createGlobalTheme(":root", {
  space: {
    small: "4px",
    medium: "8px",
    large: "16px",
  },
  colors: {
    board: {
      background: "#123",
    },
    player0: {
      med: "#f0a",
      lite: "lightcoral",
      dark: "darkmagenta",
      text: getContrastYIQ("#f0a"),
    },
    player1: {
      med: "#0af",
      lite: "lightblue",
      dark: "darkblue",
      text: getContrastYIQ("#0af"),
    },
    player2: {
      med: "#fa0",
      lite: "lightorange",
      dark: "darkorange",
      text: getContrastYIQ("#fa0"),
    },
    player3: {
      med: "#0c8",
      lite: "lightgreen",
      dark: "darkgreen",
      text: getContrastYIQ("#0c8"),
    },
    liteText: "#e6e6e6",
    darkText: "#333",
  },
  font: {
    family: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
})
