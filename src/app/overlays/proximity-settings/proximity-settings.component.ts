import {Component, ViewEncapsulation} from '@angular/core';
import {Data} from "../../data";
import {range} from "rxjs";
import {Airport} from "./proximity.model";

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
export class ProximitySettingsComponent {
  airports: Airport[] = []


  addItem($event: MouseEvent | TouchEvent): void {
    this.airports.push(new Airport())
  }

  saveAndClose() {
    // this.globalData.profileData[this.globalData.currentProfileID].columnStructure = this.dashboard
    // let data = {"columnData": this.dashboard}
    // localStorage.setItem("profileStructure", JSON.stringify(this.globalData.profileData))
    // this.dialogRef.close(this.dashboard)
  }

  closeWithoutSaving() {
    // this.dialogRef.close()
  }

  protected readonly Airport = Airport;
}
