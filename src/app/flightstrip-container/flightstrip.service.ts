import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Flightstrip, stripType} from "./flightstrip.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DataService} from "../services/data.service";
import {Util} from "../util";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 60;
  isInputFocused: boolean = false;
  changedTriangleState = new Subject<void>();
  changedCommunicationState = new Subject<void>();
  dragFlightstrip = new Subject<boolean>()
  changedType = new Subject<{ type: stripType, id: string }>()
  dragChange = new Subject<{ id: string, dragEnabled: boolean }>()
  searchFlightstrip = new Subject<void>()
  baseURL = environment.baseURL
  changedStripPos = new Subject<{ id: string, newPosistion: number }>()

  constructor(private dataService: DataService, private http: HttpClient, private util: Util) {
  }

  findFlightStrip(callsign: string) {
    let currentColumnIDList: string [] = []
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure.forEach((element: any) => {
      currentColumnIDList.push(element.uuid)
    });

    currentColumnIDList.forEach((colID: string) => {
      for (let flightstrip of this.dataService.flightstripData[colID].flightstrips) {
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
    return this.http.get(`${this.baseURL}/airline/` + icaoCode)
  }

  createFlightstrip(column: string, callsign: string, type: stripType) {
    let nextPos = this.dataService.flightstripData?.[column]?.['flightstrips'].length
    let fs = new Flightstrip(this.util.generateUUID(), type, column, nextPos);
    if (callsign !== "") {
      fs.callsign = callsign
    }

    if (callsign.length >= 3) {
      this.getAirlineCallsign(callsign.substring(0, 3)).subscribe({
        next: (res: any) => {
          console.log(res)
          fs.airline = res.airline
          this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
        }
      })
    } else {
      this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
    }

  }

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

}
