import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {range} from "rxjs";
import {Airport} from "./proximity.model";
import {DataService} from "../../services/data.service";
import {MatDialogRef} from "@angular/material/dialog";

export interface DropdownOption {
  name: string,
  value: string
}

// const airportModel: Airport = {icaoCode: "", inboundColumn: "", outboundColumn: '', vfrColumn: "", range: 0}

@Component({
  selector: 'app-proximity-settings',
  templateUrl: './proximity-settings.component.html',
  styleUrls: ['./proximity-settings.component.scss', '../../../styles.scss'],
})
export class ProximitySettingsComponent implements OnInit{
  airports: Airport[] = []

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<ProximitySettingsComponent>) {
    this.airports = this.dataService.profileData[this.dataService.currentProfileID].proximity
  }
  ngOnInit(){
    this.airports = this.dataService.profileData[this.dataService.currentProfileID].proximity
    console.log(this.dataService.profileData[this.dataService.currentProfileID].proximity)
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



  protected readonly Airport = Airport;

  deleteRow(airport: Airport) {
    this.airports.splice(this.airports.indexOf(airport), 1)
  }
}
