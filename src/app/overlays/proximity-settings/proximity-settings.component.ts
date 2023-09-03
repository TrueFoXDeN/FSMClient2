import {Component, ViewEncapsulation} from '@angular/core';
import {Data} from "../../data";

export interface Airport {
  icaoCode: string;
  inboundColumn: string;
  outboundColumn: string;
  vfrColumn: string;
  range: number
}

export interface DropdownOption {
  name: string,
  value: string
}

const ELEMENT_DATA: Airport[] = [
  {icaoCode: "EDDF", inboundColumn: "APP", outboundColumn: 'DEL', "vfrColumn": "TWR", range: 15},
  {icaoCode: "EDDP", inboundColumn: "APP", outboundColumn: 'DEL', "vfrColumn": "TWR", range: 10},
];

@Component({
  selector: 'app-proximity-settings',
  templateUrl: './proximity-settings.component.html',
  styleUrls: ['./proximity-settings.component.scss', '../../../styles.scss'],
})
export class ProximitySettingsComponent {
  constructor(private globalData: Data) {
  }

  addItem($event: MouseEvent | TouchEvent): void {

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
}
