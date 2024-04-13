import {Injectable} from '@angular/core';
import {SettingsService} from "./settings.service";

export enum ShortcutType {
  PRIMARY,
  SECONDARY
}


@Injectable({
  providedIn: 'root'
})
export class ShortcutService {
  private componentActions: Map<string, Map<string, Function>> = new Map(); //Map<componentID, actionMap>
  private actionNames: Map<string, string> = new Map();
  canFire: boolean = true;

  constructor(private settingsService: SettingsService) {
    this.insertActionNames();
  }


  setTemporaryShortcut(actionName: string, shortcutString: string, isPrimary: boolean) {
    if (isPrimary) {
      this.settingsService.shortcut_tempPrimaryActionKeyConfig.set(actionName, shortcutString);
      this.settingsService.shortcut_tempPrimaryShortcutStringConfig.set(shortcutString, actionName);
    } else {
      this.settingsService.shortcut_tempSecondaryActionKeyConfig.set(actionName, shortcutString);
      this.settingsService.shortcut_tempSecondaryShortcutStringConfig.set(shortcutString, actionName);
    }

  }

  checkIfShortcutExists(shortcutString: string) {
    return this.settingsService.shortcut_primaryShortcutStringConfig.has(shortcutString) || this.settingsService.shortcut_secondaryShortcutStringConfig.has(shortcutString);
  }

  registerComponentActions(componentID: string, actionMap: Map<string, Function>) {
    if (!this.componentActions.has(componentID)) {
      this.componentActions.set(componentID, actionMap);
    }
  }

  removeComponentActions(componentID: string) {
    if (this.componentActions.has(componentID)) {
      this.componentActions.delete(componentID);
    }
  }

  executeShortcut(componentID: string, key: KeyboardEvent, trigger: string) {
    let shortcutString = this.getShortcutStringFromEvent(key)
    const actionName = this.getActionIdFromShortcut(shortcutString)
    const componentActionMap = this.componentActions.get(componentID);
    if (actionName && componentActionMap && this.canFire) {
      const action = componentActionMap.get(actionName)
      if (action) {

        key.preventDefault();
        action();
        this.canFire = false
        setTimeout(() => this.canFire = true, 25)

        return true;
      }
      return false;
    }
    return false;
  }


  getActionIdFromShortcut(shortcutString: string, useTempConfig = false) {
    let actionName;
    if (useTempConfig) {
      if (this.settingsService.shortcut_tempPrimaryShortcutStringConfig.has(shortcutString)) {
        actionName = this.settingsService.shortcut_tempPrimaryShortcutStringConfig.get(shortcutString);
      } else {
        actionName = this.settingsService.shortcut_tempSecondaryShortcutStringConfig.get(shortcutString);
      }
    } else {
      if (this.settingsService.shortcut_primaryShortcutStringConfig.has(shortcutString)) {
        actionName = this.settingsService.shortcut_primaryShortcutStringConfig.get(shortcutString);
      } else {
        actionName = this.settingsService.shortcut_secondaryShortcutStringConfig.get(shortcutString);
      }
    }

    return actionName;
  }

  deleteFromTempShortcutStringConfig(shortcutString: string) {
    if (this.settingsService.shortcut_tempPrimaryShortcutStringConfig.has(shortcutString)) {
      this.settingsService.shortcut_tempPrimaryShortcutStringConfig.delete(shortcutString);
      return 1;
    }

    if (this.settingsService.shortcut_tempSecondaryShortcutStringConfig.has(shortcutString)) {
      this.settingsService.shortcut_tempSecondaryShortcutStringConfig.delete(shortcutString);
      return 2;
    }
    return 0;
  }

  deleteFromTempActionKeyConfig(actionKeyString: string) {
    if (this.settingsService.shortcut_tempPrimaryActionKeyConfig.has(actionKeyString)) {
      this.settingsService.shortcut_tempPrimaryActionKeyConfig.delete(actionKeyString);
      return 1;
    }
    if (this.settingsService.shortcut_tempSecondaryActionKeyConfig.has(actionKeyString)) {
      this.settingsService.shortcut_tempSecondaryActionKeyConfig.delete(actionKeyString);
      return 2;
    }
    return 0;
  }

  deleteSingleShortcutFromTempActionKeyConfig(actionKeyString: string, isPrimary: boolean) {
    if (isPrimary) {
      if (this.settingsService.shortcut_tempPrimaryActionKeyConfig.has(actionKeyString)) {
        this.settingsService.shortcut_tempPrimaryActionKeyConfig.delete(actionKeyString);
      }
    } else {
      if (this.settingsService.shortcut_tempSecondaryActionKeyConfig.has(actionKeyString)) {
        this.settingsService.shortcut_tempSecondaryActionKeyConfig.delete(actionKeyString);
      }
    }
  }


  getShortcutStringFromEvent(key: KeyboardEvent, useEmptyKey: boolean = false) {
    let shortcutString = ""
    if (key.ctrlKey || key.metaKey) shortcutString += "ctrl";
    shortcutString += "+";
    if (key.altKey) shortcutString += "alt";
    shortcutString += "+";
    if (key.shiftKey) shortcutString += "shift";
    shortcutString += "+";
    if (useEmptyKey) {
      shortcutString += "";
    } else {
      shortcutString += key.key;
    }

    return shortcutString;
  }

//Format: ctrl+alt+shift+key


  insertActionNames() {
    this.actionNames.set("openSearchCallsign", "Search Callsign");
    this.actionNames.set("abortDeletion", "Abort deletion");
    this.actionNames.set("deleteFs", "Delete");
    this.actionNames.set("toggleCompact", "Toggle view-mode");
    this.actionNames.set("prevStatus", "Previous status");
    this.actionNames.set("nextStatus", "Next status");
    this.actionNames.set("createVfr", "Create VFR strip");
    this.actionNames.set("createOutbound", "Create Outbound strip");
    this.actionNames.set("createInbound", "Create Inbound strip")
  }

  getActionNames() {
    return this.actionNames;
  }

  getPrimaryConfig() {
    return this.settingsService.shortcut_primaryShortcutStringConfig;
  }

  getSecondaryConfig() {
    return this.settingsService.shortcut_secondaryShortcutStringConfig;
  }

  getTempPrimaryConfig() {
    return this.settingsService.shortcut_tempPrimaryShortcutStringConfig;
  }

  getTempSecondaryConfig() {
    return this.settingsService.shortcut_tempSecondaryShortcutStringConfig;
  }

  getTempPrimaryActionKeyConfig() {
    return this.settingsService.shortcut_tempPrimaryActionKeyConfig;
  }

  getTempSecondaryActionKeyConfig() {
    return this.settingsService.shortcut_tempSecondaryActionKeyConfig;
  }


  findShortcutInPrimaryConfig(actionName: string, useTempConfig = false) {
    if (useTempConfig) {
      for (let [key, value] of this.settingsService.shortcut_tempPrimaryShortcutStringConfig) {
        if (value === actionName) return key;
      }
    } else {
      for (let [key, value] of this.settingsService.shortcut_primaryShortcutStringConfig) {
        if (value === actionName) return key;
      }
    }
    return ""
  }

  findShortcutInSecondaryConfig(actionName: string, useTempConfig = false) {
    if (useTempConfig) {
      for (let [key, value] of this.settingsService.shortcut_tempSecondaryShortcutStringConfig) {
        if (value === actionName) return key;
      }
    } else {
      for (let [key, value] of this.settingsService.shortcut_secondaryShortcutStringConfig) {
        if (value === actionName) return key;
      }
    }
    return ""
  }


}
