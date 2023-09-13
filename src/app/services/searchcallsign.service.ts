import {Injectable} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SearchCallsignComponent} from "../overlays/search-callsign/search-callsign.component";
import {CustomStyles} from "../customStyles";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";


@Injectable({
  providedIn: 'root'
})
export class SearchcallsignService {

  isOpen: boolean = false

  constructor(private customStyle: CustomStyles, private fsService: FlightstripService,  public dialog: MatDialog) {
  }

  openSearchCallsign() {
    if(!this.isOpen){
      this.isOpen = true
      const dialogConfig = new MatDialogConfig()
      dialogConfig.height = `${150 * this.customStyle.multiplier}px`;
      dialogConfig.width = `${300 * this.customStyle.multiplier}px`;
      const dialogRef = this.dialog.open(SearchCallsignComponent, dialogConfig);
      dialogRef.afterClosed().subscribe((data) => {
        this.isOpen = false
        this.fsService.findFlightStrip(data);
      });
    }

  }

}
