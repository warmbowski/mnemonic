import { pl, Translations } from "."

const MESSAGES_ES: Translations = {
  gameName: () => "Unearthed",
  gameTitle: () => "Mushroom Hunter",
  // Matches component
  spectatorName: () => "Espectador",
  playersBasket: (name: string) => `La cesta de ${name}`,
  noMatchesYou: () => `¡Aún no has encontrado ningún juego de hongos!`,
  noMatchesThem: (name: string) =>
    `¡${name} aún no ha encontrado ningún juego de setas!`,
  matchesYou: (count: number) =>
    `Has encontrado ${count} hongos ${pl(count, "juego", "juegos")}.`,
  matchesThem: (name: string, count: number) =>
    `${name} ha encontrado ${count} hongos ${pl(count, "juego", "juegos")}.`,
  biggestStreak: (count: number) => `Tu racha más grande: ${count}`,
  won: () => "Ganaste!",
  lost: (name: string) => `¡${name} ganó!`,
  tie: () => "¡Empate a cero!",
  value: (score: number) =>
    `VaValorlue: ${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
  setsFound: (count: number) =>
    `${count} ${pl(count, "juego", "juegos")} encontrado`,
  inTries: (count: number) => `en ${count} ${pl(count, "turno", "turnos")}`,
  // Board component
  yourTurn: () => "¡¡Te toca!!",
  onAStreak: (count: number) => `¡¡En una racha de ${count}!!`,
  // Players component
  $: () => "$",
  // Tile component
  score: (score: number) => `${score < 0 ? "-" : "+"}$${Math.abs(score)}`, // e.g. +$10 or -$10
}

export default MESSAGES_ES
