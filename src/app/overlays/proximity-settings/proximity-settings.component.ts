import {Component} from '@angular/core';
import {Airport} from "./proximity.model";
import {DataService} from "../../services/data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ProximityService} from "../profile-settings/proximity.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {stripType} from "../../flightstrip-container/flightstrip.model";

export interface DropdownOption {
  name: string,
  value: string
}


@Component({
  selector: 'app-proximity-settings',
  templateUrl: './proximity-settings.component.html',
  styleUrls: ['./proximity-settings.component.scss', '../../../styles.scss'],
})
export class ProximitySettingsComponent {
  airports: Airport[] = []
  columns: any = []

  constructor(private dataService: DataService, private proximityService: ProximityService,
              private flightstripService: FlightstripService, public dialogRef: MatDialogRef<ProximitySettingsComponent>) {
    this.airports = []
    this.dataService.profileData[this.dataService.currentProfileID].proximity.forEach((val: any) => this.airports.push(Object.assign({}, val)));
    Object.assign({}, this.dataService.profileData[this.dataService.currentProfileID].proximity)
    this.columns = this.dataService.profileData[this.dataService.currentProfileID].columnStructure

    this.proximityService.getAircraftsInProximity("ivao", this.airports).subscribe({
        next: (res: any) => {
          console.log(res)
          let inboundColumn = ''
          let outboundColumn = ''
          let vfrColumn = ''
          for (const [k, v] of Object.entries(res.inbound)) {
            for (let airport of this.airports) {
              if (airport.icao === k) {
                inboundColumn = airport.inboundColumn
              }
            }

            if (Array.isArray(v)) {
              for (const aircraft of v) {
                this.flightstripService.createFlightstrip(inboundColumn, aircraft, stripType.INBOUND)

              }
            }

          }
          for (const [k, v] of Object.entries(res.outbound)) {

            for (let airport of this.airports) {
              if (airport.icao === k) {
                outboundColumn = airport.outboundColumn
              }
            }
            if (Array.isArray(v)) {
              for (const aircraft of v) {
                this.flightstripService.createFlightstrip(outboundColumn, aircraft, stripType.OUTBOUND)
              }
            }

          }
          for (const [k, v] of Object.entries(res.vfr)) {
            for (let airport of this.airports) {
              if (airport.icao === k) {
                vfrColumn = airport.vfrColumn
              }
            }
            if (Array.isArray(v)) {
              for (const aircraft of v) {
                this.flightstripService.createFlightstrip(vfrColumn, aircraft, stripType.VFR)
              }
            }

          }
        }
      }
    )
  }


  addItem($event: MouseEvent | TouchEvent): void {
    this.airports.push(new Airport())
  }

  saveAndClose() {
    this.dataService.profileData[this.dataService.currentProfileID].proximity = this.airports
    localStorage.setItem("profileStructure", JSON.stringify(this.dataService.profileData))
    this.dialogRef.close()

  }

  closeWithoutSaving() {
    this.dialogRef.close()
  }

  deleteRow(airport: Airport) {
    this.airports.splice(this.airports.indexOf(airport), 1)
  }
}
