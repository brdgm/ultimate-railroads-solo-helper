import CardDeck from '@/services/CardDeck'
import Module from '@/services/enum/Module'
import Track from '@/services/enum/Track'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new([])

    expect(deck.pile.length, 'pile size').to.eq(16)
    expect(deck.currentCard, 'current card').to.undefined
    expect(deck.discard.length, 'discard size').to.eq(0)

    
    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(16)
    expect(persistence.currentCard, 'current card').to.undefined
    expect(persistence.discard.length, 'discard size').to.eq(0)
  })

  it('newWithModules', () => {
    const deck = CardDeck.new([Module.COAL, Module.MANUFACTORY_TRAIN])

    expect(deck.pile.length, 'pile size').to.eq(18)
    expect(deck.discard.length, 'discard size').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile:['hire-engineer'],currentCard:'doubler',discard:[]})

    expect(deck.pile.length, 'pile size').to.eq(1)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.currentCard?.id, 'current card').to.eq('doubler')

    expect(deck.draw([Track.LEVEL1])).to.true
    expect(deck.pile.length, 'pile size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(1)
    expect(deck.currentCard?.id, 'current card').to.eq('hire-engineer')

    expect(deck.draw([Track.LEVEL1])).to.false
    expect(deck.pile.length, 'pile size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(2)
    expect(deck.currentCard, 'current card').to.undefined
  })

  it('drawUnavailableTrack', () => {
    const deck = CardDeck.fromPersistence({pile:['build-track-level5-1step','build-track-level3-2step','build-track-level2-3step'],
        currentCard:'doubler', discard:[]})

    expect(deck.pile.length, 'pile size').to.eq(3)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.currentCard?.id, 'current card').to.eq('doubler')

    expect(deck.draw([Track.LEVEL1,Track.LEVEL2])).to.true
    expect(deck.pile.length, 'pile size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(3)
    expect(deck.currentCard?.id, 'current card').to.eq('build-track-level2-3step')
  })

  it('prepareForNewRound', () => {
    const deck = CardDeck.fromPersistence({pile:['doubler'],currentCard:'industry-2step',discard:['hire-engineer','industry-1step']})

    expect(deck.pile.length, 'pile size').to.eq(1)
    expect(deck.discard.length, 'discard size').to.eq(2)

    deck.prepareForNewRound()

    expect(deck.pile.length, 'pile size').to.eq(4)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.currentCard?.id, 'current card').to.undefined
  })
})
