export const MATCH_SCORE_ANIMATION_DURATION = 1
export const REVERT_REVEALED_TILES_DELAY = 3

interface Theme {
  images: {
    mushrooms: string[]
    trees: string[]
    ground: string
    youIcon: string
    scoreIcon: string
    negScoreIcon: string
    badMatch: string
  }
  audio: {
    negScore: string
    posScore: string
    reveal: string
    revert: string
    yourTurn: string
  }
  itemNames: string[]
}

/**
 * color palette for this theme https://lospec.com/palette-list/resurrect-64
 */
export const MUSHROOM_HUNTER_THEME: Theme = {
  itemNames: [
    // row 1
    "Lefleure",
    "Bluffbroom",
    "Sherrycap",
    "Woodstool",
    "Eldertwig",
    "Couchcushion",
    "Bowlfeeder",
    "Cinnabonnet",
    // row 2
    "Burndtumbrella",
    "Candiewick",
    "Tumbleweezer",
    "Sparrowshroom",
    "Formaldehide",
    "Bumblepatch",
    "Buttontops",
    "Gruntake",
    // row 3
    "Gentleman’s Pinkie",
    "Compatriot",
    "Footstabber",
    "Nightvision",
    "Grapelump",
    "Farfletcher",
    "Pompadour",
    "Vassalworm",
    // row 4
    "Porcelette",
    "Bumblebush",
    "Trumpetcleaner",
    "Ogleberry Jam",
    "Tippletoe",
    "Skarlet Fringed",
    "Humblebrag",
    "Pickle Fringed",
    // row 5
    "Woodchip",
    "Truckasaurus",
    "Neatloaf",
    "Ghostcostume",
    "Dinofoot",
    "Tacklebulb",
    "Schemer",
    "Shamstone",
    // row 6
    "Periwinkles",
    "Marblina",
    "Gnometop",
    "Bakerscap",
    "Devil's Claw",
    "Plantain",
    "Ladylegs",
    "Lieluck",
  ],
  images: {
    mushrooms: [
      // row 1
      "themes/mushroom-hunter/mushrooms/Icon1.png",
      "themes/mushroom-hunter/mushrooms/Icon2.png",
      "themes/mushroom-hunter/mushrooms/Icon3.png",
      "themes/mushroom-hunter/mushrooms/Icon4.png",
      "themes/mushroom-hunter/mushrooms/Icon5.png",
      "themes/mushroom-hunter/mushrooms/Icon6.png",
      "themes/mushroom-hunter/mushrooms/Icon7.png",
      "themes/mushroom-hunter/mushrooms/Icon8.png",
      // row 2
      "themes/mushroom-hunter/mushrooms/Icon9.png",
      "themes/mushroom-hunter/mushrooms/Icon10.png",
      "themes/mushroom-hunter/mushrooms/Icon11.png",
      "themes/mushroom-hunter/mushrooms/Icon12.png",
      "themes/mushroom-hunter/mushrooms/Icon13.png",
      "themes/mushroom-hunter/mushrooms/Icon14.png",
      "themes/mushroom-hunter/mushrooms/Icon15.png",
      "themes/mushroom-hunter/mushrooms/Icon16.png",
      // row 3
      "themes/mushroom-hunter/mushrooms/Icon17.png",
      "themes/mushroom-hunter/mushrooms/Icon18.png",
      "themes/mushroom-hunter/mushrooms/Icon19.png",
      "themes/mushroom-hunter/mushrooms/Icon20.png",
      "themes/mushroom-hunter/mushrooms/Icon21.png",
      "themes/mushroom-hunter/mushrooms/Icon22.png",
      "themes/mushroom-hunter/mushrooms/Icon23.png",
      "themes/mushroom-hunter/mushrooms/Icon24.png",
      // row 4
      "themes/mushroom-hunter/mushrooms/Icon25.png",
      "themes/mushroom-hunter/mushrooms/Icon26.png",
      "themes/mushroom-hunter/mushrooms/Icon27.png",
      "themes/mushroom-hunter/mushrooms/Icon28.png",
      "themes/mushroom-hunter/mushrooms/Icon29.png",
      "themes/mushroom-hunter/mushrooms/Icon30.png",
      "themes/mushroom-hunter/mushrooms/Icon31.png",
      "themes/mushroom-hunter/mushrooms/Icon32.png",
      // row 5
      "themes/mushroom-hunter/mushrooms/Icon33.png",
      "themes/mushroom-hunter/mushrooms/Icon34.png",
      "themes/mushroom-hunter/mushrooms/Icon35.png",
      "themes/mushroom-hunter/mushrooms/Icon36.png",
      "themes/mushroom-hunter/mushrooms/Icon37.png",
      "themes/mushroom-hunter/mushrooms/Icon38.png",
      "themes/mushroom-hunter/mushrooms/Icon39.png",
      "themes/mushroom-hunter/mushrooms/Icon40.png",
      // row 6
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
    badMatch: "themes/mushroom-hunter/spores2.png",
  },
  audio: {
    negScore: "default-audio/neg-score.wav",
    posScore: "default-audio/pos-score.wav",
    reveal: "default-audio/reveal.wav",
    revert: "default-audio/revert.wav",
    yourTurn: "default-audio/your-turn.wav",
  },
}
