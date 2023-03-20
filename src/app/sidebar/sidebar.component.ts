import {Component, OnInit} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements  OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar,public dialog: Dialog) {
  }

  openColumnbuilder() {
    const dialogRef = this.dialog.open(ColumnBuilderComponent, {
      height: '800px',
      width: '1200px',
      panelClass: 'my-dialog',
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

  ngOnInit(): void {
    this.openColumnbuilder();
  }
}
