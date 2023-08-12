import RoundManager from '@/services/RoundManager'
import { expect } from 'chai'
import mockState from '../helper/mockState'
import Module from '@/services/enum/Module'
import Track from '@/services/enum/Track'
import CardDeck from '@/services/CardDeck'

describe('services/RoundManager', () => {
  it('prepareFirstRound', () => {
    const roundManager = new RoundManager(mockState({modules:[Module.COAL]}))
    const round = roundManager.prepareFirstRound()

    expect(round.round).to.eq(1)
    expect(round.turns.length).to.eq(1)
    const turn1 = round.turns[0]
    expect(turn1.round).to.eq(1)
    expect(turn1.turn).to.eq(1)
    expect(turn1.availableTracks).to.eql([Track.LEVEL1])
    expect(turn1.cardDeck.currentCard).to.not.undefined
  })

  it('prepareNextRound', () => {
    const roundManager = new RoundManager(mockState({modules:[Module.COAL]}))
    const round = roundManager.prepareNextRound(2, [Track.LEVEL1,Track.LEVEL2],
        CardDeck.fromPersistence({pile:['doubler'],currentCard:'industry-2step',discard:['hire-engineer','industry-1step']}))

    expect(round.round).to.eq(2)
    expect(round.turns.length).to.eq(1)
    const turn1 = round.turns[0]
    expect(turn1.round).to.eq(2)
    expect(turn1.turn).to.eq(1)
    expect(turn1.availableTracks).to.eql([Track.LEVEL1,Track.LEVEL2])
    expect(turn1.cardDeck.currentCard).to.not.undefined
  })

  it('getNumberOfRounds', () => {
    const roundManager = new RoundManager(mockState())
    expect(roundManager.getNumberOfRounds()).to.eq(6)
  })

  it('getNumberOfRounds_coal', () => {
    const roundManager = new RoundManager(mockState({modules:[Module.COAL]}))
    expect(roundManager.getNumberOfRounds()).to.eq(5)
  })

  it('getNumberOfRounds_manufactory-train', () => {
    const roundManager = new RoundManager(mockState({modules:[Module.MANUFACTORY_TRAIN]}))
    expect(roundManager.getNumberOfRounds()).to.eq(5)
  })

  it('getNumberOfRounds_coal_manufactory-train', () => {
    const roundManager = new RoundManager(mockState({modules:[Module.COAL,Module.MANUFACTORY_TRAIN]}))
    expect(roundManager.getNumberOfRounds()).to.eq(5)
  })
})
