export const MATCH_SCORE_ANIMATION_DURATION = 1
export const REVERT_REVEALED_TILES_DELAY = 3

export const MUSHROOM_HUNTER_THEME: {
  mushrooms: string[]
  trees: string[]
  ground: string
  youIcon: string
  scoreIcon: string
  negScoreIcon: string
} = {
  mushrooms: [
    "themes/mushroom-hunter/mushrooms/Icon1.png",
    "themes/mushroom-hunter/mushrooms/Icon2.png",
    "themes/mushroom-hunter/mushrooms/Icon3.png",
    "themes/mushroom-hunter/mushrooms/Icon4.png",
    "themes/mushroom-hunter/mushrooms/Icon5.png",
    "themes/mushroom-hunter/mushrooms/Icon6.png",
    "themes/mushroom-hunter/mushrooms/Icon7.png",
    "themes/mushroom-hunter/mushrooms/Icon8.png",
    "themes/mushroom-hunter/mushrooms/Icon9.png",
    "themes/mushroom-hunter/mushrooms/Icon10.png",
    "themes/mushroom-hunter/mushrooms/Icon11.png",
    "themes/mushroom-hunter/mushrooms/Icon12.png",
    "themes/mushroom-hunter/mushrooms/Icon13.png",
    "themes/mushroom-hunter/mushrooms/Icon14.png",
    "themes/mushroom-hunter/mushrooms/Icon15.png",
    "themes/mushroom-hunter/mushrooms/Icon16.png",
    "themes/mushroom-hunter/mushrooms/Icon17.png",
    "themes/mushroom-hunter/mushrooms/Icon18.png",
    "themes/mushroom-hunter/mushrooms/Icon19.png",
    "themes/mushroom-hunter/mushrooms/Icon20.png",
    "themes/mushroom-hunter/mushrooms/Icon21.png",
    "themes/mushroom-hunter/mushrooms/Icon22.png",
    "themes/mushroom-hunter/mushrooms/Icon23.png",
    "themes/mushroom-hunter/mushrooms/Icon24.png",
    "themes/mushroom-hunter/mushrooms/Icon25.png",
    "themes/mushroom-hunter/mushrooms/Icon26.png",
    "themes/mushroom-hunter/mushrooms/Icon27.png",
    "themes/mushroom-hunter/mushrooms/Icon28.png",
    "themes/mushroom-hunter/mushrooms/Icon29.png",
    "themes/mushroom-hunter/mushrooms/Icon30.png",
    "themes/mushroom-hunter/mushrooms/Icon31.png",
    "themes/mushroom-hunter/mushrooms/Icon32.png",
    "themes/mushroom-hunter/mushrooms/Icon33.png",
    "themes/mushroom-hunter/mushrooms/Icon34.png",
    "themes/mushroom-hunter/mushrooms/Icon35.png",
    "themes/mushroom-hunter/mushrooms/Icon36.png",
    "themes/mushroom-hunter/mushrooms/Icon37.png",
    "themes/mushroom-hunter/mushrooms/Icon38.png",
    "themes/mushroom-hunter/mushrooms/Icon39.png",
    "themes/mushroom-hunter/mushrooms/Icon40.png",
    "themes/mushroom-hunter/mushrooms/Icon41.png",
    "themes/mushroom-hunter/mushrooms/Icon42.png",
    "themes/mushroom-hunter/mushrooms/Icon43.png",
    "themes/mushroom-hunter/mushrooms/Icon44.png",
    "themes/mushroom-hunter/mushrooms/Icon45.png",
    "themes/mushroom-hunter/mushrooms/Icon46.png",
    "themes/mushroom-hunter/mushrooms/Icon47.png",
    "themes/mushroom-hunter/mushrooms/Icon48.png",
  ],
  trees: [
    "themes/mushroom-hunter/trees/Autumn_tree2.png",
    "themes/mushroom-hunter/trees/Christmas_tree2.png",
    "themes/mushroom-hunter/trees/Flower_tree2.png",
    "themes/mushroom-hunter/trees/Moss_tree2.png",
    "themes/mushroom-hunter/trees/Tree2.png",
  ],
  ground: "themes/mushroom-hunter/forest-floor.png",
  youIcon: "themes/mushroom-hunter/star.png",
  scoreIcon: "themes/mushroom-hunter/coin.png",
  negScoreIcon: "themes/mushroom-hunter/spores.png",
}

const pl = (n: number, singular: string, plural: string) =>
  n === 1 ? singular : plural

export type Translations = typeof MESSAGES_EN
export const MESSAGES_EN = {
  // Matches component
  spectatorName: () => "Spectator",
  playersBasket: (name: string) => `${name}'s basket`,
  noMatchesYou: () => `You haven't found any mushroom sets yet!`,
  noMatchesThem: (name: string) =>
    `${name} hasn't found any mushroom sets yet!`,
  matchesYou: (count: number) =>
    `You have found ${count} mushroom ${pl(count, "set", "sets")}.`,
  matchesThem: (name: string, count: number) =>
    `${name} has found ${count} mushroom ${pl(count, "set", "sets")}.`,
  won: () => "You won the game!",
  lost: (name: string) => `${name} won the game!`,
  tie: () => "It's a tie!",
  value: (score: number) =>
    `Value: ${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
  setsFound: (count: number) => `${count} ${pl(count, "set", "sets")} found`,
  inTries: (count: number) => `in ${count} ${pl(count, "try", "tries")}`,
  // Board component
  yourTurn: () => "Your Turn!!",
  // Players component
  $: () => "$",
  // Tile component
  score: (score: number) => `${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
}
