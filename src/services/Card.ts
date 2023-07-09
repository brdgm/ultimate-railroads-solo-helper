import Placement from "./enum/Placement"
import Module from "./enum/Module"

export default interface Card {
  id: string
  placement: Placement
  workerCount: number 
  modules?: Module[]  
}
