import Cards from '@/services/Cards'
import Module from '@/services/enum/Module'
import { expect } from 'chai'

describe('services/Cards', () => {
  it('get', () => {
    const card = Cards.get('build-track-level1-3step')

    expect(card).not.undefined
    expect(card?.id).to.eq('build-track-level1-3step')
  })

  it('getAll', () => {
    const cards = Cards.getAll([])
    expect(cards.length).eq(16)
  })

  it('getAll_coal', () => {
    const cards = Cards.getAll([Module.COAL])
    expect(cards.length).eq(17)
    expect(cards.map(card => card.id)).to.include('module-coal')
  })

  it('getAll_manufactory-train', () => {
    const cards = Cards.getAll([Module.MANUFACTORY_TRAIN])
    expect(cards.length).eq(17)
    expect(cards.map(card => card.id)).to.include('module-manufactory-train')
  })

  it('getAll_all-modules', () => {
    const cards = Cards.getAll([Module.COAL, Module.MANUFACTORY_TRAIN])
    expect(cards.length).eq(18)
    expect(cards.map(card => card.id)).to.include('module-coal')
    expect(cards.map(card => card.id)).to.include('module-manufactory-train')
  })
})
