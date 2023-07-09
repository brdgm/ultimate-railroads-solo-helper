import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Module from './enum/Module';
import Placement from './enum/Placement';

const cards = [
  { id: 'build-locomotive-and-factory', placement: Placement.WORKER, workerCount: 3 },
  { id: 'build-locomotive-or-factory', placement: Placement.WORKER, workerCount: 1 },
  { id: 'build-track-level1-3step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'build-track-level2-3step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'build-track-level3-1step', placement: Placement.WORKER, workerCount: 1 },
  { id: 'build-track-level3-2step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'build-track-level4-1step', placement: Placement.WORKER, workerCount: 1 },
  { id: 'build-track-level4-2step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'build-track-level5-1step', placement: Placement.WORKER, workerCount: 1 },
  { id: 'build-track-level5-2step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'build-track-wild-2step', placement: Placement.WORKER_COIN, workerCount: 1 },
  { id: 'doubler', placement: Placement.WORKER, workerCount: 1 },
  { id: 'hire-engineer', placement: Placement.COIN, workerCount: 0 },
  { id: 'industry-1step', placement: Placement.WORKER, workerCount: 1 },
  { id: 'industry-2step', placement: Placement.WORKER, workerCount: 2 },
  { id: 'use-engineer-light-side', placement: Placement.WORKER, workerCount: 1 },
  { id: 'module-coal', placement: Placement.WORKER, workerCount: 1, module: [Module.COAL] },
  { id: 'module-manufactory-train', placement: Placement.WORKER, workerCount: 1, module: [Module.MANUFACTORY_TRAIN] }
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
