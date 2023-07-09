import CardDeck from '@/services/CardDeck'
import Module from '@/services/enum/Module'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new([])

    expect(deck.pile.length, 'pile size').to.eq(16)
    expect(deck.discard.length, 'discard size').to.eq(0)

    expect(deck.currentCard, 'current card').to.not.undefined
    
    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile size').to.eq(16)
    expect(persistence.discard.length, 'discard size').to.eq(0)
  })

  it('newWithModules', () => {
    const deck = CardDeck.new([Module.COAL, Module.MANUFACTORY_TRAIN])

    expect(deck.pile.length, 'pile size').to.eq(18)
    expect(deck.discard.length, 'discard size').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile:['doubler','hire-engineer'],discard:[]})

    expect(deck.pile.length, 'pile size').to.eq(2)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.currentCard?.id, 'current card').to.eq('doubler')

    expect(deck.draw()).to.true
    expect(deck.pile.length, 'pile size').to.eq(1)
    expect(deck.discard.length, 'discard size').to.eq(1)
    expect(deck.currentCard?.id, 'current card').to.eq('hire-engineer')

    expect(deck.draw()).to.false
    expect(deck.pile.length, 'pile size').to.eq(0)
    expect(deck.discard.length, 'discard size').to.eq(2)
    expect(deck.currentCard, 'current card').to.undefined
  })

  it('prepareForNewRound', () => {
    const deck = CardDeck.fromPersistence({pile:['doubler'],discard:['hire-engineer','industry-1step']})

    expect(deck.pile.length, 'pile size').to.eq(1)
    expect(deck.discard.length, 'discard size').to.eq(2)

    deck.prepareForNewRound()

    expect(deck.pile.length, 'pile size').to.eq(3)
    expect(deck.discard.length, 'discard size').to.eq(0)
    expect(deck.currentCard?.id, 'current card').to.not.undefined
  })
})
