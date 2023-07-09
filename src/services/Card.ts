import Module from "./enum/Module"

export default interface Card {
  id: string
  modules?: Module[]
}
