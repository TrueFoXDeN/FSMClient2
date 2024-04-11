import {Injectable} from '@angular/core';
import {Subject, throwError} from "rxjs";
import {Flightstrip, StatusArrival, StatusDeparture, StatusVfr, StripType} from "./flightstrip.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DataService} from "../services/data.service";
import {Util} from "../util";

import {MultiplayerSendService} from "../services/multiplayer-send.service";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 60;
  isInputFocused: boolean = false;
  changedTriangleState = new Subject<void>();
  changedCommunicationState = new Subject<void>();
  dragFlightstrip = new Subject<boolean>()
  changedType = new Subject<{ type: StripType, id: string }>()
  dragActive = new Subject<{ id: string, dragEnabled: boolean }>()
  searchFlightstrip = new Subject<void>()
  baseURL = environment.baseURL
  changedStripPos = new Subject<{ id: string, newPosition: number }>()

  constructor(private dataService: DataService, private http: HttpClient, private util: Util, private mpService: MultiplayerSendService) {
  }

  findFlightStrip(callsign: string) {
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure.forEach((element: any) => {
      for (let flightstrip of this.dataService.flightstripData[element.uuid].flightstrips) {
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

  getFlightstripByCallsign(callsign: string, network: string) {
    return this.http.get(`${this.baseURL}/${network}/callsign/` + callsign)
  }

  getAirlineCallsign(icaoCode: string) {
    let allowed = /[\d*\w*]/;
    if (allowed.test(icaoCode)) {
      return this.http.get(`${this.baseURL}/airline/` + icaoCode)
    }
    return throwError(() => new Error('malformed callsign'))
  }

  createFlightstrip(column: string, callsign: string, type: StripType, uuid = "", tempFs: any = undefined, createdFromMultiplayer = false) {
    let nextPos = this.dataService.flightstripData?.[column]?.['flightstrips'].length
    let fs: Flightstrip
    if (uuid === "") {
      fs = new Flightstrip(this.util.generateUUID(), type, column, nextPos);
    } else {
      fs = new Flightstrip(uuid, type, column, nextPos);
    }

    if (callsign !== "") {
      fs.callsign = callsign
    }

    if (createdFromMultiplayer) {
      fs.compactMode = true;
    }

    if (callsign.length >= 3) {
      this.getAirlineCallsign(callsign.substring(0, 3)).subscribe({
        next: (res: any) => {

          fs.airline = res.airline
          this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
          console.log({colId: column, type: type, fsId: fs.id})
          if (!createdFromMultiplayer) {
            this.mpService.processMessage("create_flightstrip", {colId: column, type: type, fsId: fs.id});
          }

        },
        error: (err) => {
        }
      })
    } else {
      this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
      console.log({colId: column, type: type, fsId: fs.id})
      if (!createdFromMultiplayer) {
        this.mpService.processMessage("create_flightstrip", {colId: column, type: type, fsId: fs.id});
      }

    }

  }

  createFlightstripWithObject(column: string, uuid: string, flightstrip: any, isCreatedByMultiplayer: boolean = false) {
    let nextPos = this.dataService.flightstripData?.[column]?.['flightstrips'].length
    let fs: Flightstrip;
    fs = new Flightstrip(uuid, flightstrip.type, column, nextPos);
    fs.callsign = flightstrip.callsign || "";
    fs.departureIcao = flightstrip.departureIcao || "";
    fs.arrivalIcao = flightstrip.arrivalIcao || "";
    fs.aircraft = flightstrip.aircraft || "";

    fs.wakeCategory = flightstrip.wakeCategory || "";
    fs.flightrule = flightstrip.flightrule || "";
    fs.altitude = flightstrip.altitude || "";
    fs.gate = flightstrip.gate || "";
    fs.info = flightstrip.info || "";
    fs.airline = flightstrip.airline || "";
    fs.squawk = flightstrip.squawk || "";
    fs.runway = flightstrip.runway || "";
    fs.sidStar = flightstrip.sidStar || "";
    fs.freeText = flightstrip.freeText || "";
    fs.route = flightstrip.route || "";
    fs.triangleIconState = flightstrip.triangleIconState || fs.triangleIconState;
    fs.communicationIconState = flightstrip.communicationIconState || fs.communicationIconState;
    fs.statusText = flightstrip.statusText || fs.statusText;
    // fs.status = this.getFsStatusText(flightstrip.statusText, flightstrip.type);
    fs.status = flightstrip.status || fs.status;
    if (isCreatedByMultiplayer) {
      fs.compactMode = true;
    }
    this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
  }


  // getFsStatusText(givenText: string, fsType: StripType): number {
  //   console.log(fsType);
  //   if (fsType == StripType.INBOUND) {
  //     console.log("Inbound");
  //     if (Object.values(StatusArrival).includes(givenText)) {
  //       return Object.keys(StatusArrival).splice(Object.keys(StatusArrival).length/2).indexOf(givenText);
  //     } else {
  //       return 0;
  //     }
  //   } else if (fsType == StripType.OUTBOUND) {
  //     console.log("Outbound");
  //     if (Object.values(StatusDeparture).includes(givenText)) {
  //       return Object.keys(StatusDeparture).splice(Object.keys(StatusDeparture).length/2).indexOf(givenText);
  //     } else {
  //       return 0;
  //     }
  //   } else if (fsType == StripType.VFR) {
  //     if (Object.values(StatusVfr).includes(givenText)) {
  //       return Object.keys(StatusVfr).splice(Object.keys(StatusVfr).length/2).indexOf(givenText);
  //     } else {
  //       return 0;
  //     }
  //   }
  //   return 0;
  //
  // }

  flightStripExists(callsign: string) {
    let currentColumnIDList: string [] = []
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure.forEach((element: any) => {
      currentColumnIDList.push(element.uuid)
    });

    for (let col of currentColumnIDList) {
      for (let flightstrip of this.dataService.flightstripData[col].flightstrips) {
        if (flightstrip.callsign == callsign) {
          return true;
        }
      }
    }
    return false

  }

  getIndexInColumnByID(colID: string, fsID: string) {
    let fsIndex = -1;
    for (let i = 0; i < this.dataService.flightstripData[colID].flightstrips.length; i++) {
      if (this.dataService.flightstripData[colID].flightstrips[i].id === fsID) {
        fsIndex = i;
      }
    }
    return fsIndex;
  }

}
