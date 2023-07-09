import Placement from "./enum/Placement"
import Module from "./enum/Module"
import Track from "./enum/Track"

export default interface Card {
  id: string
  placement: Placement
  workerCount: number
  track?: Track
  modules?: Module[]  
}
