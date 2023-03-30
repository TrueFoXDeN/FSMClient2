import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-search-callsign',
  templateUrl: './search-callsign.component.html',
  styleUrls: ['./search-callsign.component.scss']
})
export class SearchCallsignComponent {
  callsign: string = ""
  searchButtonActive = false

  constructor(public dialogRef: MatDialogRef<SearchCallsignComponent>) {
  }

  onClose() {
    if (this.searchButtonActive) {
      this.dialogRef.close(this.callsign)
    }
  }

  onInput() {
    this.searchButtonActive = this.callsign.length > 0;
  }
}
