import { defineStore } from 'pinia'
import { name } from '@/../package.json'
import Module from '@/services/enum/Module'
import Track from '@/services/enum/Track'

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
      const round = this.rounds.find(item => item.round == turn.round)
      if (!round) {
        throw new Error(`Round does not exist: ${turn.round}`)
      }
      round.turns = round.turns.filter(item => item.turn != turn.turn)
      round.turns.push(turn)
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
  cardDeck: CardDeckPersistence
  availableTracks: Track[]
}
export interface CardDeckPersistence {
  pile: string[]
  discard: string[]
}
