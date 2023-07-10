import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import Module from '@/services/enum/Module'
import Track from '@/services/enum/Track'
import Player from '@/services/enum/Player'

export const useStateStore = defineStore(`${name}.state`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        modules: []
      },
      rounds: []
    } as State
  },
  actions: {
    resetGame() {
      this.rounds = []
    },
    storeRound(round : Round) {
      this.rounds = this.rounds.filter(item => item.round != round.round)
      this.rounds.push(round)
    },
    storeTurn(turn : Turn) {
      const round = getRound(this, turn.round)
      round.turns = round.turns.filter(item => item.turn != turn.turn)
      round.turns.push(turn)
    },
    updateTurnAvailableTracks(roundNo: number, turnNo: number, availableTracks: Track[]) {
      const round = getRound(this, roundNo)
      const turn = getTurn(round, turnNo)
      turn.availableTracks = availableTracks
    }
  },
  persist: true
})

export interface State {
  language: string,
  baseFontSize: number,
  setup: Setup,
  rounds: Round[]
}
export interface Setup {
  modules: Module[]
}
export interface Round {
  round: number
  turns: Turn[]
}
export interface Turn {
  round: number
  turn: number
  player: Player
  cardDeck: CardDeckPersistence
  availableTracks: Track[]
}
export interface CardDeckPersistence {
  pile: string[]
  currentCard?: string
  discard: string[]
}


function getRound(state: State, roundNo: number) : Round {
  const round = state.rounds.find(item => item.round == roundNo)
  if (!round) {
    throw new Error(`Round does not exist: ${roundNo}`)
  }
  return round
}

function getTurn(round: Round, turnNo: number) : Turn {
  const turn = round.turns.find(item => item.turn == turnNo)
  if (!turn) {
    throw new Error(`Turn does not exist: ${turnNo} in round ${round.round}`)
  }
  return turn
}
