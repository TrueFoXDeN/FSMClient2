import {Component, OnInit} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Data} from "../data";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar, public dialog: MatDialog, private globalData: Data) {
  }

  openColumnbuilder() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '80vh';
    dialogConfig.width = '80vw';
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container',
      dialogConfig.data = {
        columnData: JSON.parse(JSON.stringify(this.globalData.columnStructure))
      }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        this.globalData.columnStructure = data;
      }
      this.globalData.columnStructure.forEach((column) => {
        if (this.globalData.flightstripData[column?.['uuid']] !== null) {
          console.log(`Neue Column: ${column?.['name']}`)
          this.globalData.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
        }
      });
      console.log(this.globalData.flightstripData)
    });

  }

  onZoomIn() {
    if (this.customStyle.multiplier < 2.2) {
      this.customStyle.multiplier += 0.15;
      this._snackBar.open(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`, "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1500,
      });
    }
  }

  onZoomOut() {
    if (this.customStyle.multiplier > 0.7) {
      this.customStyle.multiplier -= 0.15;
      this._snackBar.open(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`, "", {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 1500,
      });
    }
  }

  searchCallsign() {
    console.log(this.globalData.flightstripData)
  }

  ngOnInit(): void {
  }
}
