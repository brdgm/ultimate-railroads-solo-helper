import { Round, State, Turn } from '@/store/state'
import Module from './enum/Module'
import CardDeck from './CardDeck'
import Track from './enum/Track'
import Player from './enum/Player'

export default class RoundManager {

  private _modules : Module[]

  public constructor(state : State) {
    this._modules = state.setup.modules
  }

  /**
   * Prepares the first round
   * @returns Round
   */
  public prepareFirstRound() : Round {
    const round = 1
    const turn = 1
    const player = Player.BOT
    const cardDeck = CardDeck.new(this._modules)
    const availableTracks : Track[] = [Track.LEVEL1]
    cardDeck.draw(availableTracks)
    const turns : Turn[] = [{ round, turn, player, cardDeck: cardDeck.toPersistence(), availableTracks }]
    return { round, turns }
  }

  /**
   * Prepares the next round
   * @param roundNo Next round number
   * @param availableTracks Available tracks
   * @param cardDeck Card deck
   * @returns Round
   */
  public prepareNextRound(roundNo : number, availableTracks: Track[], cardDeck: CardDeck) : Round {
    const round = roundNo
    const turn = 1
    const player = Player.BOT
    cardDeck.prepareForNewRound()
    cardDeck.draw(availableTracks)
    const turns : Turn[] = [{ round, turn, player, cardDeck: cardDeck.toPersistence(), availableTracks }]
    return { round, turns }
  }

  /**
   * @returns Number of rounds depending on module selection
   */
  public getNumberOfRounds() : number {
    if (this._modules.includes(Module.COAL) || this._modules.includes(Module.MANUFACTORY_TRAIN)) {
      return 5
    }
    return 6
  }

}
