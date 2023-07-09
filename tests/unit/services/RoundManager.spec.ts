import RoundManager from '@/services/RoundManager'
import { expect } from 'chai'
import mockState from '../helper/mockState'
import Module from '@/services/enum/Module'
import Track from '@/services/enum/Track'

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
  })
})
