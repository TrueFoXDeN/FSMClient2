import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SearchCallsignComponent} from "../overlays/search-callsign/search-callsign.component";
import {CustomStyles} from "../customStyles";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {StyleChangerService} from "./style-changer.service";


@Injectable({
  providedIn: 'root'
})
export class SearchcallsignService {

  isOpen: boolean = false

  constructor(private fsService: FlightstripService, public dialog: MatDialog, private styleChanger: StyleChangerService) {
  }

  openSearchCallsign() {
    if (!this.isOpen) {
      this.isOpen = true
      const dialogConfig = new MatDialogConfig()
      dialogConfig.height = `${150 * this.styleChanger.multiplier}px`;
      dialogConfig.width = `${300 * this.styleChanger.multiplier}px`;
      const dialogRef = this.dialog.open(SearchCallsignComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        this.isOpen = false
        this.fsService.findFlightStrip(data);
      });
    }

  }

}
