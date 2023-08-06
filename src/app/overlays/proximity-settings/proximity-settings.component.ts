import {Component} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Data} from "../../data";

export interface Airport {
  position: number,
  name: string;
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
  {position: 1, name: "EDDF", inboundColumn: "APP", outboundColumn: 'DEL', "vfrColumn": "TWR", range: 15},
  {position: 2, name: "EDDP", inboundColumn: "APP", outboundColumn: 'DEL', "vfrColumn": "TWR", range: 10},
];

@Component({
  selector: 'app-proximity-settings',
  templateUrl: './proximity-settings.component.html',
  styleUrls: ['./proximity-settings.component.scss'],
})
export class ProximitySettingsComponent {
  displayedColumns: string[] = ['select', 'name', 'inboundColumn', 'outboundColumn', 'vfrColumn', 'range'];
  dataSource = new MatTableDataSource<Airport>(ELEMENT_DATA);
  selection = new SelectionModel<Airport>(true, []);
  columns: DropdownOption[] = []

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Airport): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(private globalData: Data) {
    Object.entries(globalData.flightstripData).forEach(([key, value], index) => {
      this.columns.push({name: globalData.flightstripData[key]["name"], value: key})
    });
  }
}
