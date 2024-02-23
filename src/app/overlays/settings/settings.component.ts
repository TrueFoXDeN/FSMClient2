import {Component} from '@angular/core';

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

  onSettingClick(selector: SettingsTypes) {
    this.settingsSelector = selector;
  }

  protected readonly SettingsTypes = SettingsTypes;
}
