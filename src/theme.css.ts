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
    background: "#ab947a",
    board: {
      background: "#676633",
    },
    player0: {
      med: "#fca790",
      lite: "#fdcbb0",
      dark: "#f68181",
      text: getContrastYIQ("#fca790"),
    },
    player1: {
      med: "#cf657f",
      lite: "#ed8099",
      dark: "#a24b6f",
      text: getContrastYIQ("#cf657f"),
    },
    player2: {
      med: "#a884f3",
      lite: "#eaaded",
      dark: "#905ea9",
      text: getContrastYIQ("#a884f3"),
    },
    player3: {
      med: "#4d65b4",
      lite: "#4d9be6",
      dark: "#484a77",
      text: getContrastYIQ("#4d65b4"),
    },
    liteText: "#e6e6e6",
    darkText: "#333",
  },
  font: {
    family:
      'fibberish, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
  },
})
