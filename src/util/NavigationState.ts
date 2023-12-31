import CardDeck from '@/services/CardDeck'
import RoundManager from '@/services/RoundManager'
import Player from '@/services/enum/Player'
import Track from '@/services/enum/Track'
import { Round, State, Turn } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly player : Player
  readonly turnData : Turn
  readonly cardDeck: CardDeck
  readonly lastTurnLastRound? : number
  readonly numberOfRounds : number

  public constructor(route : RouteLocation, state: State) {    
    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
    
    this.turnData = getTurn(this.round, this.turn, state.rounds)
    this.player = this.turnData.player
    this.cardDeck = CardDeck.fromPersistence(this.turnData.cardDeck)

    if (this.round > 1) {
      this.lastTurnLastRound = getLastTurn(this.round - 1, state.rounds)?.turn
    }

    this.numberOfRounds = new RoundManager(state).getNumberOfRounds()
  }

}

function getTurn(roundNo: number, turnNo: number, rounds: Round[]) : Turn {
  const round = rounds.find(item => item.round == roundNo)
  if (round)  {
    const turn = round.turns.find(item => item.turn == turnNo)
    if (turn) {
      return turn
    }
  }
  // fallback: should never happen
  return { round: roundNo, turn: turnNo, player: Player.BOT, availableTracks: [Track.LEVEL1], cardDeck: CardDeck.new([]).toPersistence() }
}

function getLastTurn(roundNo: number, rounds: Round[]) : Turn|undefined {
  const round = rounds.find(item => item.round == roundNo)
  if (round) {
    return round.turns[round.turns.length - 1]
  }
  return undefined
}
