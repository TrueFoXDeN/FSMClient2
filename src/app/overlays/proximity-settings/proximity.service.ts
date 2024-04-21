import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Airport} from "./proximity.model";
import {NetworkType} from "../../services/network.service";
import {StripType} from "../../flightstrip-container/flightstrip.model";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {SnackbarMessageService} from "../../services/snackbar-message.service";
import {ColumnService} from "../../column/column.service";
import {DataService} from "../../services/data.service";
import {SettingsService} from "../../services/settings.service";

@Injectable({
  providedIn: 'root'
})
export class ProximityService {
  baseURL = environment.baseURL
  finishedAircrafts: string[] = []
  lastAudioTime = Date.now();

  constructor(private http: HttpClient, private flightstripService: FlightstripService,
              private snackService: SnackbarMessageService,
              private columnService: ColumnService,
              protected dataService: DataService,
              private settingsService: SettingsService) {
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
            // TODO Callsigns, die nicht in columns vorhanden sind, in extra Liste schreiben
            // => Anfrage an Backend mit allen Callsigns aus dieser Liste, wenn Länge >0
            // => Alle Daten für diese Callsigns zurückgeben
            // => Hash bilden und mit Hash aus finishedList abgleichen
            // => Alle flightstrips hinzufügen, deren Hash nicht in der finishedList vorkommen
            this.flightstripService.createFlightstrip(inboundColumn, aircraft, StripType.INBOUND);
            this.playAudio("../assets/notification.mp3");
            this.snackService.showMessage(`Added ${aircraft} to ${inboundColumnName}`, "info");
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

            this.flightstripService.createFlightstrip(outboundColumn, aircraft, StripType.OUTBOUND);
            this.playAudio("../assets/notification.mp3");
            this.snackService.showMessage(`Added ${aircraft} to ${outboundColumnName}`, "info");
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
            this.flightstripService.createFlightstrip(vfrColumn, aircraft, StripType.VFR);
            this.playAudio("../assets/notification.mp3");
            this.snackService.showMessage(`Added ${aircraft} to ${vfrColumnName}`, "info");
          }
        }
      }
    }
  }

  playAudio(path: string) {
    if (this.settingsService.playSoundWhenAddingFlightstripViaProximity) {
      if (Date.now() - this.lastAudioTime > 5000) {
        this.lastAudioTime = Date.now();
        let audio = new Audio();
        audio.src = path;
        audio.volume = this.settingsService.addFlightstripSoundVolume;
        audio.load();
        audio.play();
      }
    }

  }
}
