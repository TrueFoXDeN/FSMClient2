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
  isSecondaryRecording: boolean,
  primaryErrorDetected: boolean,
  secondaryErrorDetected: boolean
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
  backupConfigData: KeybindingConfig [] = []
  actionNames: Map<string, string> = new Map()
  primaryConfig: Map<string, string> = new Map();
  secondaryConfig: Map<string, string> = new Map();
  inputsLocked: boolean = false;

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
    this.inputsLocked = true;
    this.backupConfigData = this.configData;
    let index = this.configData.indexOf(config)
    if (isPrimary) {
      this.configData[index].primaryShortcutString = "";
      this.configData[index].isPrimaryRecording = true;
    } else {
      this.configData[index].secondaryShortcutString = "";
      this.configData[index].isSecondaryRecording = true;
    }
  }

  onKeyInput(config: KeybindingConfig, event: KeyboardEvent, isPrimary: boolean) {
    console.log(event);
    let index = this.configData.indexOf(config);
    event.preventDefault();

    if (event.key != "Control" && event.key != "Meta" && event.key != "Shift" && event.key != "Alt") {
      if (isPrimary) {
        this.configData[index].primaryShortcutString = this.shortcutService.getShortcutStringFromEvent(event);
      } else {
        this.configData[index].secondaryShortcutString = this.shortcutService.getShortcutStringFromEvent(event);
      }

    } else {
      if (isPrimary) {
        this.configData[index].primaryShortcutString = this.shortcutService.getShortcutStringFromEvent(event, true);
      } else {
        this.configData[index].secondaryShortcutString = this.shortcutService.getShortcutStringFromEvent(event, true);
      }

    }


  }

  onKeyUp(config: KeybindingConfig, isPrimary: boolean) {
    let index = this.configData.indexOf(config);
    if (isPrimary) {
      let keyArray = this.configData[index].primaryShortcutString.split("+");
      if (keyArray[3] === "") {
        this.configData[index].primaryShortcutString = "";
      } else {
        this.configData[index].primaryErrorDetected = false;
      }
    } else {
      let keyArray = this.configData[index].secondaryShortcutString.split("+");
      if (keyArray[3] === "") {
        this.configData[index].secondaryShortcutString = "";
      } else {
        this.configData[index].secondaryErrorDetected = false;
      }
    }
    if (isPrimary) {
      if (this.shortcutService.getTempPrimaryConfig().has(config.primaryShortcutString) || this.shortcutService.getTempSecondaryConfig().has(config.primaryShortcutString)) {
        this.configData[index].primaryErrorDetected = true;
      }
    } else {
      if (this.shortcutService.getTempPrimaryConfig().has(config.secondaryShortcutString) || this.shortcutService.getTempSecondaryConfig().has(config.secondaryShortcutString)) {

        this.configData[index].secondaryErrorDetected = true;
      }
    }

  }

  onApplyClick(config: KeybindingConfig, isPrimary: boolean) {
    let index = this.configData.indexOf(config)
    if (config.isPrimaryRecording && !config.primaryErrorDetected) {
      if (isPrimary) {
        let newShortcut = config.primaryShortcutString;
        let action = config.actionName
        this.shortcutService.deleteFromTempShortcutStringConfig(this.shortcutService.getTempPrimaryActionKeyConfig().get(action)!)
        this.shortcutService.deleteSingleShortcutFromTempActionKeyConfig(action, true);
        this.shortcutService.setTemporaryShortcut(action, newShortcut, true);
      }
      this.inputsLocked = false;
      this.configData[index].primaryErrorDetected = false;
      this.configData[index].secondaryErrorDetected = false;
      this.configData[index].isPrimaryRecording = false;
      this.configData[index].isSecondaryRecording = false;
      this.loadDataIntoConfig();
    }

    if (config.isSecondaryRecording && !config.secondaryErrorDetected) {
      if (!isPrimary) {
        let newShortcut = config.secondaryShortcutString;
        let action = config.actionName
        this.shortcutService.deleteFromTempShortcutStringConfig(this.shortcutService.getTempSecondaryConfig().get(action)!)
        this.shortcutService.deleteSingleShortcutFromTempActionKeyConfig(action, false);
        this.shortcutService.setTemporaryShortcut(action, newShortcut, false);
      }
      this.inputsLocked = false;
      this.configData[index].primaryErrorDetected = false;
      this.configData[index].secondaryErrorDetected = false;
      this.configData[index].isPrimaryRecording = false;
      this.configData[index].isSecondaryRecording = false;
      this.loadDataIntoConfig();
    }


  }

  setShortcutToDefault(config: KeybindingConfig, isPrimary: boolean) {
    // return if button action should not be executed
    if ((config.isPrimaryDefault && isPrimary) || (config.isSecondaryDefault && !isPrimary)) {
      return;
    }
    if (isPrimary) {
      //Load default shortcut string for given action
      let newDefaultShortcutString = this.defaultShortcutService.getPrimaryDefaultActionConfig().get(config.actionName) || ""

      //Find primary action which uses the default shortcut as its current shortcut
      let possiblePrimaryDuplicateKeyActionName = this.shortcutService.getTempPrimaryConfig().get(newDefaultShortcutString) || "";

      // If another action uses a key which is the default of this action, it will be cleared
      if (possiblePrimaryDuplicateKeyActionName != "") {
        this.shortcutService.deleteFromTempShortcutStringConfig(newDefaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(possiblePrimaryDuplicateKeyActionName)
        console.log(`${possiblePrimaryDuplicateKeyActionName} has the same key as the default of ${config.actionName}`);
      }

      //Find secondary action which uses the default shortcut as its current shortcut
      let possibleSecondaryDuplicateKeyActionName = this.shortcutService.getTempSecondaryConfig().get(newDefaultShortcutString) || "";

      // If another action uses a key which is the default of this action, it will be cleared
      if (possibleSecondaryDuplicateKeyActionName != "") {
        this.shortcutService.deleteFromTempShortcutStringConfig(newDefaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(possibleSecondaryDuplicateKeyActionName)
        console.log(`${possibleSecondaryDuplicateKeyActionName} has the same key as the default of ${config.actionName}`);
      }

      //Delete own old shortcuts
      this.shortcutService.deleteFromTempShortcutStringConfig(config.primaryShortcutString);
      this.shortcutService.deleteSingleShortcutFromTempActionKeyConfig(config.actionName, isPrimary);

      //Set default shortcut,
      if (newDefaultShortcutString != "") {
        this.shortcutService.setTemporaryShortcut(config.actionName, newDefaultShortcutString, true);
      }

      this.loadDataIntoConfig();

    } else {
      //Load default shortcut string for given action
      let newDefaultShortcutString = this.defaultShortcutService.getSecondaryDefaultActionConfig().get(config.actionName) || ""

      //Find action which uses the default shortcut as its current shortcut
      let possiblePrimaryDuplicateKeyActionName = this.shortcutService.getTempSecondaryConfig().get(newDefaultShortcutString) || "";

      // If another action uses a key which is the default of this action, it will be cleared
      if (possiblePrimaryDuplicateKeyActionName != "") {
        this.shortcutService.deleteFromTempShortcutStringConfig(newDefaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(possiblePrimaryDuplicateKeyActionName)
        console.log(`${possiblePrimaryDuplicateKeyActionName} has the same key as the default of ${config.actionName}`);
      }

      //Find secondary action which uses the default shortcut as its current shortcut
      let possibleSecondaryDuplicateKeyActionName = this.shortcutService.getTempSecondaryConfig().get(newDefaultShortcutString) || "";

      // If another action uses a key which is the default of this action, it will be cleared
      if (possibleSecondaryDuplicateKeyActionName != "") {
        this.shortcutService.deleteFromTempShortcutStringConfig(newDefaultShortcutString)
        this.shortcutService.deleteFromTempActionKeyConfig(possibleSecondaryDuplicateKeyActionName)
        console.log(`${possibleSecondaryDuplicateKeyActionName} has the same key as the default of ${config.actionName}`);
      }

      //Delete own old shortcuts
      this.shortcutService.deleteFromTempShortcutStringConfig(config.secondaryShortcutString);
      this.shortcutService.deleteSingleShortcutFromTempActionKeyConfig(config.actionName, isPrimary);

      //Set default shortcut
      if (newDefaultShortcutString != "") {
        this.shortcutService.setTemporaryShortcut(config.actionName, newDefaultShortcutString, false);
      }

      this.loadDataIntoConfig();
    }
  }

  cancelRecording(config: KeybindingConfig) {

    this.inputsLocked = false;
    let index = this.configData.indexOf(config)
    this.configData[index].primaryErrorDetected = false;
    this.configData[index].secondaryErrorDetected = false;
    this.configData[index].isPrimaryRecording = false;
    this.configData[index].isSecondaryRecording = false;
    this.loadDataIntoConfig();
  }
}
