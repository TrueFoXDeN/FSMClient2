import {Component, OnInit} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Data} from "../data";
import {StyleChangerService} from "../services/style-changer.service";
import {SnackbarMessageService} from "../services/snackbar-message.service";
import {ColumnBuilderService} from "../services/column-builder.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar, public dialog: MatDialog,
              private globalData: Data, private styleChanger: StyleChangerService, private snackService: SnackbarMessageService,
              private colBuilderService: ColumnBuilderService) {
  }

  openColumnbuilder() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '80vh';
    dialogConfig.width = '80vw';
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      columnData: JSON.parse(JSON.stringify(this.globalData.columnStructure))
    }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        this.globalData.columnStructure = data;
      }
      this.globalData.columnStructure.forEach((column) => {
        if (this.globalData.flightstripData[column?.['uuid']] == null) {
          this.globalData.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
        }
      });
      this.colBuilderService.columnConfigChanged.next();
    });
  }

  onZoomIn() {
    if (this.customStyle.multiplier < 2.2) {
      this.customStyle.multiplier += 0.15;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`)
      this.styleChanger.changedSize.next();
    }
  }

  onZoomOut() {
    if (this.customStyle.multiplier > 0.7) {
      this.customStyle.multiplier -= 0.15;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`)
      this.styleChanger.changedSize.next();
    }
  }

  searchCallsign() {
    console.log(this.globalData.flightstripData)
  }

  ngOnInit(): void {
  }
}
