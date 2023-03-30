import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Flightstrip, stripType} from "./flightstrip.model";
import {Data} from "../data";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 100;
  isInputFocused: boolean = false;
  changedTriangleState = new Subject<void>();

  dragFlightstrip = new Subject<boolean>()
  changedType = new Subject<{ type: stripType, id: string }>()
  dragChange = new Subject<{ id: string, dragEnabled: boolean }>()
  searchFlightstrip = new Subject<void>()

  constructor(private globalData: Data) {
  }

  findFlightStrip(callsign: string) {
    let currentColumnIDList: string [] = []
    this.globalData.profileData[this.globalData.currentProfileID].columnStructure.forEach((element: any) => {
      currentColumnIDList.push(element.uuid)
    });

    currentColumnIDList.forEach((colID: string) => {
      for (let flightstrip of this.globalData.flightstripData[colID].flightstrips) {
        if (flightstrip.callsign == callsign) {
          flightstrip.isMarkedBySearch = true;
          flightstrip.compactMode = false;
          setTimeout(() => {
            this.searchFlightstrip.next();
          }, 1)
          break;
        }
      }
    });
  }
}
