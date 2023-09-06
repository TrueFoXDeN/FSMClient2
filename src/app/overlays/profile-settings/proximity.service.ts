import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Airport} from "../proximity-settings/proximity.model";
import {NetworkType} from "../../services/network.service";
import {stripType} from "../../flightstrip-container/flightstrip.model";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";

@Injectable({
  providedIn: 'root'
})
export class ProximityService {
  baseURL = environment.baseURL

  constructor(private http: HttpClient, private flightstripService: FlightstripService) {


  }

  getAircraftsInProximity(networkType: NetworkType, airports: Airport[]) {
    let body = {airports: airports.filter(airport => airport.active)}
    let network = ''
    switch (networkType){
      case NetworkType.IVAO: network = 'ivao'
        break
      case NetworkType.VATSIM: network = 'vatsim'
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

      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft)) {
            this.flightstripService.createFlightstrip(inboundColumn, aircraft, stripType.INBOUND)
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
      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft)) {
            this.flightstripService.createFlightstrip(outboundColumn, aircraft, stripType.OUTBOUND)
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
      if (Array.isArray(v)) {
        for (const aircraft of v) {
          if (!this.flightstripService.flightStripExists(aircraft)) {
            this.flightstripService.createFlightstrip(vfrColumn, aircraft, stripType.VFR)
          }
        }
      }

    }
  }
}
