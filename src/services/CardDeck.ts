import * as _ from 'lodash'
import Card from './Card'
import Cards from './Cards'
import { CardDeckPersistence } from '@/store/state'
import Module from './enum/Module'
import Track from './enum/Track'

export default class CardDeck {

  private _pile : Card[]
  private _discard : Card[]

  public constructor(pile : Card[], discard : Card[]) {
    this._pile = pile
    this._discard = discard
  }

  public get currentCard() : Card|undefined {
    return this._pile[0]
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  /**
   * Draws a card from the draw pile. If this card related to a track level not yet available, a new card is drawn immediately.
   * If the pile is empty, the discard pile is reshuffled before drawing.
   * @param availableTracks Available track levels from player
   * @returns true if a new card was drawn
   */
  public draw(availableTracks: Track[]) : boolean {
    const discardCard = this._pile.shift()
    if (discardCard) {
      this._discard.push(discardCard)
    }

    if (this.currentCard && this.currentCard.track && !availableTracks.includes(this.currentCard.track)) {
      return this.draw(availableTracks)
    }
    else {
      return this._pile.length > 0
    }
  }

  /**
   * Prepares the card deck for a new round: Add back all discarded cards and shuffle.
   */
  public prepareForNewRound() : void {
    this._pile.push(...this._discard)
    this._discard = []
    this._pile = _.shuffle(this._pile)
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      discard: this._discard.map(card => card.id)
    }
  }

  /**
   * Creates a shuffled new card deck.
   * @param modules Modules
   */
  public static new(modules: Module[]) : CardDeck {
    const pile = _.shuffle(Cards.getAll(modules))
    return new CardDeck(pile, [])
  }

  /**
   * Re-creates card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
