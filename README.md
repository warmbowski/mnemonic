# Unearthed: Mushroom Hunter

A local Mycologist is looking to buy rare mushrooms, but only in pairs. Compete against your friends in collecting the rarest mushrooms so as to earn the largest total for the mushrooms you sell to the Mycologist. You collect them by tapping on the trees to reveal two each turn. If they are a match, you collect the $$$. If they don't match, they hide back in their tree. Watch out for the poison mushrooms! You don't know they are poison until you try to collect.

<img src="screenshot2024-10-01.png" width="500" />

# Mnemonic

An expanded digital version of the basic card matching game Concentration. This is a multiplayer online version built for the Rune social gaming platform.

#### Basic gameplay to implement:

- [x] Create list of paired items and shuffle and render into a grid layout.
- [x] Implement basic game logic for two players, rendering guesses in realtime and alternating between players when guess is not a match
- [x] Keep matches revealed until end of game and add to players list of matches
- [x] Add scoring to matched pairs that is added to users score when match is obtained
- [x] Render players and their basic game stats (number of matches and score)
- [x] Stub in basic UX design
- [ ] Add options and start splash screen before gameplay begins
- [ ] Design a great UI theme with cool animations that make for a very pleasant game experience
- [ ] i18n the app
- [ ] support single player mode

#### Expanded gameplay ideas to implement:

- [ ] Support multiplayer > 2
- [ ] Adjustable game size
- [ ] Game time limit
- [ ] Turn time limit
- [ ] Advantage (powerup) effects for specific matches per game
  - Random item revealed
  - Shuffle other players grid
  - Revoke other players match
  - Swap any two cards without other player knowing
- [ ] Disadvantage effects for specific matches per game
  - You grid gets shuffled
  - One of your matches is revoked
  - Lose points equal to score of next item revealed
- [ ] Persist game stats for each player: PRs, Totals, etc

#### Expanded UX ideas:

- [ ] Add ability to unlock new themes

#### Codebase improvements

- [ ] move to monorepo and break components and logic into local packages to be used on other playforms.

## Getting Started with Rune

### `npm run dev`

Runs the game in Dev UI.

The page will reload when you make changes.

### `npm run upload`

Builds the game and starts upload process to Rune.

### `npm run build`

Builds the game. You can then upload it to Rune using `npx rune-games-cli@latest upload`.

### `npm run lint`

Runs the validation rules. You can read about them in the [docs on server-side logic](https://developers.rune.ai/docs/advanced/server-side-logic).

### `npm run typecheck`

Verifies that TypeScript is valid.

## Learn More

See the [Rune docs](https://developers.rune.ai/docs/quick-start) for more info. You can also ask any questions in the [Rune Discord](https://discord.gg/rune-devs), we're happy to help!
