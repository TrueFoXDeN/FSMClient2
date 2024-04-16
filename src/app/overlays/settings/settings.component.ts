import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {NetworkMenuComponent} from "../network-menu/network-menu.component";
import {SettingsDiscardDialogComponent} from "../settings-discard-dialog/settings-discard-dialog.component";
import {StyleChangerService} from "../../services/style-changer.service";
import {SettingsService} from "../../services/settings.service";
import {SnackbarMessageService} from "../../services/snackbar-message.service";

export enum SettingsTypes {
  GENERAL,
  KEYBINDINGS,
  ATC_FREQS,
  MULTIPLAYER
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})


export class SettingsComponent {
  settingsSelector: SettingsTypes = SettingsTypes.KEYBINDINGS
  protected readonly settingItems = SettingsTypes;
  protected readonly SettingsTypes = SettingsTypes;

  constructor(public dialog: MatDialog, private styleChanger: StyleChangerService, private settingsService: SettingsService, private settingsDialogRef: MatDialogRef<SettingsComponent>, private snackService : SnackbarMessageService) {
  }

  onSettingClick(selector: SettingsTypes) {
    this.settingsSelector = selector;
  }

  onDiscardClick() {
    // console.log(this.checkForSettingsDifferences())
    if (this.checkForSettingsDifferences()) {

      this.openDiscardDialog();
    } else {
      this.settingsDialogRef.close()
    }
  }

  onSaveClick() {
    this.settingsService.copyTempKeybindingsToActualConfig();
    this.settingsService.saveSettingsToLocalstorage();
    this.settingsDialogRef.close();
    this.snackService.showMessage("Saved settings", "success");
  }

  openDiscardDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${140 * this.styleChanger.multiplier}px`;
    dialogConfig.width = `${320 * this.styleChanger.multiplier}px`;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(SettingsDiscardDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((discard) => {
      if (discard) {
        // console.log("discard");
        this.settingsService.copyActualKeybindingsBackToTempConfig();
        this.settingsDialogRef.close();
      } else {
        // console.log("cancel");
      }
    });
  }

  checkForSettingsDifferences() {
    // console.log("Temp:")
    // console.log(this.settingsService.shortcut_tempPrimaryShortcutStringConfig);
    // console.log("Actual:")
    // console.log(this.settingsService.shortcut_primaryShortcutStringConfig);
    if (!this.mapsAreTheSame(this.settingsService.shortcut_tempPrimaryShortcutStringConfig, this.settingsService.shortcut_primaryShortcutStringConfig)) return true;
    if (!this.mapsAreTheSame(this.settingsService.shortcut_tempPrimaryActionKeyConfig, this.settingsService.shortcut_primaryActionKeyConfig)) return true;
    if (!this.mapsAreTheSame(this.settingsService.shortcut_tempSecondaryShortcutStringConfig, this.settingsService.shortcut_secondaryShortcutStringConfig)) return true;
    if (!this.mapsAreTheSame(this.settingsService.shortcut_tempSecondaryActionKeyConfig, this.settingsService.shortcut_secondaryActionKeyConfig)) return true;
    return false;
  }

  mapsAreTheSame(map1: Map<string, string>, map2: Map<string, string>): boolean {
    let testVal;
    if (map1.size !== map2.size) {
      return false;
    }
    for (let [key, val] of map1) {
      testVal = map2.get(key);
      if (testVal !== val || (testVal === undefined && !map2.has(key))) {
        return false;
      }
    }
    return true;
  }
}
