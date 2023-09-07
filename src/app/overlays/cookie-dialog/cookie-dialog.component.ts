import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cookie-dialog',
  templateUrl: './cookie-dialog.component.html',
  styleUrls: ['./cookie-dialog.component.scss']
})
export class CookieDialogComponent {

  constructor(public dialogRef: MatDialogRef<CookieDialogComponent>,) {
  }

  onClose() {
    this.dialogRef.close()
  }
}
