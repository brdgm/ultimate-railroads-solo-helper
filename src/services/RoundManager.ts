import { Round, State, Turn } from "@/store/state"
import Module from "./enum/Module"
import CardDeck from "./CardDeck"
import Track from "./enum/Track"

export default class RoundManager {

  private _modules : Module[]
  private _rounds : Round[]

  public constructor(state : State) {
    this._modules = state.setup.modules
    this._rounds = state.rounds
  }

  /**
   * Prepares the first round
   * @returns Round
   */
  public prepareFirstRound() : Round {
    const round = 1
    const turn = 1
    const cardDeck = CardDeck.new(this._modules)
    const availableTracks : Track[] = [Track.LEVEL1]
    const turns : Turn[] = [{ round, turn, cardDeck: cardDeck.toPersistence(), availableTracks }]
    return { round, turns }
  }

}
