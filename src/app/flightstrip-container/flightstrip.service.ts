import {Injectable} from '@angular/core';
import {Observable, Subject, throwError} from "rxjs";
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

  createFlightstrip(column: string, callsign: string, type: stripType, uuid = "") {
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

    if (callsign.length >= 3) {
      this.getAirlineCallsign(callsign.substring(0, 3)).subscribe({
        next: (res: any) => {

          fs.airline = res.airline
          this.dataService.flightstripData?.[column]?.['flightstrips'].push(fs);
        },
        error: (err) => {
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
