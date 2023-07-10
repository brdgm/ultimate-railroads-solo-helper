import { Round, State, Turn } from "@/store/state"
import Module from "./enum/Module"
import CardDeck from "./CardDeck"
import Track from "./enum/Track"
import Player from "./enum/Player"

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
    const player = Player.BOT
    const cardDeck = CardDeck.new(this._modules)
    const availableTracks : Track[] = [Track.LEVEL1]
    cardDeck.draw(availableTracks)
    const turns : Turn[] = [{ round, turn, player, cardDeck: cardDeck.toPersistence(), availableTracks }]
    return { round, turns }
  }

}
