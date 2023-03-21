import {Component, OnInit} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {Dialog, DIALOG_DATA} from '@angular/cdk/dialog';
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ColumnStructure} from "../column-structure";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar, public dialog: MatDialog, private colStructure: ColumnStructure) {
  }

  openColumnbuilder() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '80vh';
    dialogConfig.width = '80vw';
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container',
      dialogConfig.data = {
        columnData: JSON.parse(JSON.stringify(this.colStructure.columnStructure))
      }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => data != null ? this.colStructure.columnStructure = data : null
    );
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
  }
}
