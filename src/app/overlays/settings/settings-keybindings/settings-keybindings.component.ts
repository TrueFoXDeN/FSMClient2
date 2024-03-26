import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {SettingsKeybindingsDirective} from "./settings-keybindings.directive";
import {KeybindingsButtonComponent} from "./keybindings-button/keybindings-button.component";
import {ShortcutService} from "../../../services/shortcut.service";
import {NgClass} from "@angular/common";
import {KeybindingsPipe} from "./keybindings.pipe";
import {DefaultShortcutSettingsService} from "../../../services/default-shortcut-settings.service";


export interface KeybindingConfig {
  actionName: string,
  displayName: string,
  primaryShortcutString: string,
  secondaryShortcutString: string,
  isPrimaryDefault: boolean,
  isSecondaryDefault: boolean,
  isPrimaryRecording: boolean,
  isSecondaryRecording: boolean
}

@Component({
  selector: 'app-settings-keybindings',
  standalone: true,
  imports: [SettingsKeybindingsDirective, TableModule, KeybindingsButtonComponent, NgClass, KeybindingsPipe],
  templateUrl: './settings-keybindings.component.html',
  styleUrl: './settings-keybindings.component.scss'
})
export class SettingsKeybindingsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  configData: KeybindingConfig [] = []
  actionNames: Map<string, string> = new Map()
  primaryConfig: Map<string, string> = new Map();
  secondaryConfig: Map<string, string> = new Map();

  constructor(private shortcutService: ShortcutService, private defaultShortcutService: DefaultShortcutSettingsService) {
    this.actionNames = this.shortcutService.getActionNames();
    this.primaryConfig = this.shortcutService.getTempPrimaryConfig();
    this.secondaryConfig = this.shortcutService.getTempSecondaryConfig();
    this.loadDataIntoConfig();
  }


  loadDataIntoConfig() {
    this.configData = [];
    for (let key of this.actionNames.keys()) {
      let config = {
        actionName: key,
        displayName: this.actionNames.get(key),
        primaryShortcutString: this.shortcutService.findShortcutInPrimaryConfig(key, true),
        secondaryShortcutString: this.shortcutService.findShortcutInSecondaryConfig(key, true),
        isPrimaryDefault: this.defaultShortcutService.checkIfKeyIsDefaultShortcut(this.shortcutService.findShortcutInPrimaryConfig(key, true), key, true),
        isSecondaryDefault: this.defaultShortcutService.checkIfKeyIsDefaultShortcut(this.shortcutService.findShortcutInSecondaryConfig(key, true), key, false),
        isPrimaryRecording: false,
        isSecondaryRecording: false
      }
      this.configData.push(<KeybindingConfig>config);
    }
  }


  onInputClick(config: KeybindingConfig, isPrimary: boolean) {
    let index = this.configData.indexOf(config)
    if (isPrimary) {
      this.configData[index].isPrimaryRecording = true;
    } else {
      this.configData[index].isSecondaryRecording = true;
    }
  }


  setShortcutToDefault(config: KeybindingConfig, primary: boolean) {
    if ((config.isPrimaryDefault && primary) || (config.isSecondaryDefault && !primary)) {
      return;
    }
    let index = this.configData.indexOf(config);
    if (primary) {
      let actionName = this.shortcutService.getActionIdFromShortcut(config.primaryShortcutString, true);
      let defaultShortcutString = this.defaultShortcutService.getPrimaryDefaultActionConfig().get(config.actionName) || ""
      if (actionName != "" && actionName != config.actionName) {
        this.shortcutService.deleteFromTempShortcutStringConfig(defaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(actionName!)
        console.log("Found other action which uses the default key");
      }
      this.shortcutService.deleteFromTempShortcutStringConfig(config.primaryShortcutString);
      this.shortcutService.deleteFromTempActionKeyConfig(config.actionName);
      this.shortcutService.setTemporaryShortcut(config.actionName, defaultShortcutString, true);
      this.loadDataIntoConfig();

    } else {
      let defaultShortcutString = this.defaultShortcutService.getSecondaryDefaultActionConfig().get(config.actionName) || "";
      let actionName = this.shortcutService.getActionIdFromShortcut(config.secondaryShortcutString, true);
      if (actionName != "" && actionName != config.actionName) {
        console.log("Found other action which uses the default key");
        this.shortcutService.deleteFromTempShortcutStringConfig(defaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(actionName!)
      }
      this.shortcutService.deleteFromTempShortcutStringConfig(config.primaryShortcutString);
      this.shortcutService.deleteFromTempActionKeyConfig(config.actionName);
      this.shortcutService.setTemporaryShortcut(config.actionName, defaultShortcutString, false);
      this.loadDataIntoConfig();

    }
  }
}
