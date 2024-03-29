import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Airport} from "./proximity.model";
import {NetworkType} from "../../services/network.service";
import {stripType} from "../../flightstrip-container/flightstrip.model";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {SnackbarMessageService} from "../../services/snackbar-message.service";
import {ColumnService} from "../../column/column.service";
import {DataService} from "../../services/data.service";

@Injectable({
  providedIn: 'root'
})
export class ProximityService {
  baseURL = environment.baseURL
  finishedAircrafts: string[] = []

  constructor(private http: HttpClient, private flightstripService: FlightstripService,
              private snackService: SnackbarMessageService,
              private columnService: ColumnService,
              protected dataService: DataService) {


  }

  getAirports() {
    let airports: Airport[] = []
    this.dataService.profileData[this.dataService.currentProfileID].proximity.forEach((val: any) => airports.push(Object.assign({}, val)));
    return airports
  }

  getActiveAirports() {
    let airports: Airport[] = this.getAirports()
    return airports.filter(airport => airport.active)
  }

  getAircraftsInProximity(networkType: NetworkType, airports: Airport[]) {
    let body = {airports: airports.filter(airport => airport.active)}
    let network = ''
    switch (networkType) {
      case NetworkType.IVAO:
        network = 'ivao'
        break
      case NetworkType.VATSIM:
        network = 'vatsim'
        break
    }
    return this.http.post(`${this.baseURL}/${network}/proximity`, body)
  }

  updateProximity(res: any, airports: any) {
    let inboundColumn = ''
    let outboundColumn = ''
    let vfrColumn = ''

    for (const [k, v] of Object.entries(res.inbound)) {
      for (let airport of airports) {
        if (airport.icao === k) {
          inboundColumn = airport.inboundColumn
        }
      }
      let inboundColumnName = this.columnService.getColumnNameByID(inboundColumn)
      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft) && !this.finishedAircrafts.includes(aircraft)) {
            this.flightstripService.createFlightstrip(inboundColumn, aircraft, stripType.INBOUND);
            this.snackService.showMessage(`Added ${aircraft} to ${inboundColumnName}`, "success");
          }
        }
      }
    }
    for (const [k, v] of Object.entries(res.outbound)) {

      for (let airport of airports) {
        if (airport.icao === k) {
          outboundColumn = airport.outboundColumn
        }
      }
      let outboundColumnName = this.columnService.getColumnNameByID(outboundColumn)
      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft) && !this.finishedAircrafts.includes(aircraft)) {
            this.flightstripService.createFlightstrip(outboundColumn, aircraft, stripType.OUTBOUND);
            this.snackService.showMessage(`Added ${aircraft} to ${outboundColumnName}`, "success");
          }
        }
      }

    }
    for (const [k, v] of Object.entries(res.vfr)) {
      for (let airport of airports) {
        if (airport.icao === k) {
          vfrColumn = airport.vfrColumn
        }
      }
      let vfrColumnName = this.columnService.getColumnNameByID(vfrColumn)
      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft) && !this.finishedAircrafts.includes(aircraft)) {
            this.flightstripService.createFlightstrip(vfrColumn, aircraft, stripType.VFR);
            this.snackService.showMessage(`Added ${aircraft} to ${vfrColumnName}`, "success");
          }
        }
      }

    }
  }

  playAudio(path: string) {
    let audio = new Audio();
    audio.src = path;
    audio.load();
    audio.play();
  }
}
