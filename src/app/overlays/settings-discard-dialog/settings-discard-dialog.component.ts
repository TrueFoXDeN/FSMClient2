import {Component} from '@angular/core';
import {PaginatorModule} from "primeng/paginator";
import {NgIf} from "@angular/common";
import {SettingsKeybindingsDirective} from "../settings/settings-keybindings/settings-keybindings.directive";
import {SettingsDirective} from "../settings/settings.directive";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-settings-discard-dialog',
  standalone: true,
  imports: [
    PaginatorModule,
    NgIf,
    SettingsKeybindingsDirective,
    SettingsDirective
  ],
  templateUrl: './settings-discard-dialog.component.html',
  styleUrl: './settings-discard-dialog.component.scss'
})
export class SettingsDiscardDialogComponent {
  constructor(public dialogRef: MatDialogRef<SettingsDiscardDialogComponent>) {
  }

  onDiscard() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

}
