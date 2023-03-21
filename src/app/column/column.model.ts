import {Flightstrip} from "../flightstrip-container/flightstrip/flightstrip.model";

export class ColumnModel {
  id: string = ""
  flightstrips: Flightstrip[] = []
  position: number[] = []
  name: string = ""
  relativeHeight: string = "0%";

  constructor(name: string, postion: number[], relativeHeight: string) {
    this.name = name;
    this.position = postion
    this.relativeHeight = relativeHeight
  }
}
