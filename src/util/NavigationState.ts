import CardDeck from '@/services/CardDeck'
import Track from '@/services/enum/Track'
import { Round, State, Turn } from '@/store/state'
import { RouteLocation } from 'vue-router'

export default class NavigationState {

  readonly round : number
  readonly turn : number
  readonly playerTurn : boolean
  readonly botTurn : boolean
  readonly availableTracks: Track[]
  readonly cardDeck: CardDeck

  public constructor(route : RouteLocation, state: State) {    
    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
    this.playerTurn = (route.name == 'TurnPlayer')
    this.botTurn = (route.name == 'TurnBot')
    
    const turn = getTurn(this.round, this.turn, state.rounds)
    this.availableTracks = turn.availableTracks
    this.cardDeck = CardDeck.fromPersistence(turn.cardDeck)
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
  return { round: roundNo, turn: turnNo, availableTracks: [Track.LEVEL1], cardDeck: CardDeck.new([]).toPersistence() }
}
