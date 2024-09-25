interface DeckConfig {
  [-30]: number
  [10]: number
  [15]: number
  [20]: number
  [25]: number
}

interface Card {
  rank: string
  value: number
}

export class Deck {
  cardList: Card[] = []

  constructor(config: DeckConfig) {
    this.createDeck(config)
    this.shuffleDeck()
  }

  private createDeck(config: DeckConfig) {
    const uniqueCards = Object.entries(config).reduce<Deck["cardList"]>(
      (acc, [score, count]) => {
        for (let i = 0; i < count; i++) {
          acc.push({ rank: `Card${i}`, value: Number(score) })
        }
        return acc
      },
      []
    )

    this.cardList = uniqueCards.concat(uniqueCards)
  }

  public shuffleDeck() {
    //based on Fisher-Yates shuffle algorithm
    let currIndex = this.cardList.length
    let tempValue: Card | undefined = undefined
    let randomIndex: number | undefined = undefined
    while (0 !== currIndex) {
      randomIndex = Math.floor(Math.random() * currIndex)
      currIndex -= 1
      tempValue = this.cardList[currIndex]
      this.cardList[currIndex] = this.cardList[randomIndex]
      this.cardList[randomIndex] = tempValue
    }
    return this
  }

  public getDeck() {
    return this.cardList
  }
}
