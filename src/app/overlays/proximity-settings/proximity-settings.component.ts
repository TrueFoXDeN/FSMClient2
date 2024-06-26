import {Component} from '@angular/core';
import {Airport} from "./proximity.model";
import {DataService} from "../../services/data.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ProximityService} from "./proximity.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {StripType} from "../../flightstrip-container/flightstrip.model";

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
    if(this.airports.length == 0){
      this.addItem()
    }
    this.columns = this.dataService.profileData[this.dataService.currentProfileID].columnStructure
  }


  addItem(): void {
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
