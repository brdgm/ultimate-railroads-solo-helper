import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Module from './enum/Module';

const cards = [
  { id: 'build-locomotive-and-factory' },
  { id: 'build-locomotive-or-factory' },
  { id: 'build-track-level1-3step' },
  { id: 'build-track-level2-3step' },
  { id: 'build-track-level3-1step' },
  { id: 'build-track-level3-2step' },
  { id: 'build-track-level4-1step' },
  { id: 'build-track-level4-2step' },
  { id: 'build-track-level5-1step' },
  { id: 'build-track-level5-2step' },
  { id: 'build-track-wild-2step' },
  { id: 'doubler' },
  { id: 'hire-engineer' },
  { id: 'industry-1step' },
  { id: 'industry-2step' },
  { id: 'use-engineer-light-side' },
  { id: 'module-coal', module: [Module.COAL] },
  { id: 'module-manufactory-train', module: [Module.MANUFACTORY_TRAIN] }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param modules Additional modules to play with
   * @returns cards
   */
  getAll(modules: Module[]) : Card[] {
    return cards.filter(card => matchesModule(card.module, modules))
  }

}

function matchesModule(cardModules: Module[]|undefined, enabledModules: Module[]) {
  if (cardModules) {
    for (const module of cardModules) {
      if (!enabledModules.includes(module)) {
        return false
      }
    }
  }
  return true
}
