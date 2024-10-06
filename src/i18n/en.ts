import { pl } from "."

export type Translations = typeof MESSAGES_EN

const MESSAGES_EN = {
  gameName: () => "Unearthed",
  gameTitle: () => "Mushroom Hunter",
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
  biggestStreak: (count: number) => `Your biggest streak: ${count}`,
  won: () => "You won the game!",
  lost: (name: string) => `${name} won the game!`,
  tie: () => "It's a tie!",
  value: (score: number) =>
    `Value: ${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
  setsFound: (count: number) => `${count} ${pl(count, "set", "sets")} found`,
  inTries: (count: number) => `in ${count} ${pl(count, "try", "tries")}`,
  // Board component
  yourTurn: () => "Your Turn!!",
  waitYourTurn: () => "Wait for your turn",
  onAStreak: (count: number) => `On a streak of ${count}!!`,
  // Players component
  $: () => "$",
  // Tile component
  score: (score: number) => `${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
}

export default MESSAGES_EN
