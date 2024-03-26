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

  constructor(private settingsService: SettingsService) {
    this.insertActionNames();
  }


  setShortcut(shortcutString: string, actionName: string, type: ShortcutType) {
    if (type === ShortcutType.PRIMARY) {
      for (let [key, value] of this.settingsService.shortcut_primaryShortcutStringConfig) {
        if (value === actionName) {
          this.settingsService.shortcut_primaryShortcutStringConfig.delete(key);
        }
      }
      this.settingsService.shortcut_primaryShortcutStringConfig.set(shortcutString, actionName)
    } else {
      for (let [key, value] of this.settingsService.shortcut_secondaryShortcutStringConfig) {
        if (value === actionName) {
          this.settingsService.shortcut_secondaryShortcutStringConfig.delete(key);
        }
      }
      this.settingsService.shortcut_secondaryShortcutStringConfig.set(shortcutString, actionName)
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

  executeShortcut(componentID: string, key: KeyboardEvent) {

    let shortcutString = this.getShortcutStringFromEvent(key)
    const actionName = this.getActionIdFromShortcut(shortcutString)
    const componentActionMap = this.componentActions.get(componentID);
    if (actionName && componentActionMap) {
      const action = componentActionMap.get(actionName)
      if (action) {

        key.preventDefault();
        action();
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

  getShortcutStringFromEvent(key: KeyboardEvent) {
    let shortcutString = ""
    if (key.ctrlKey) shortcutString += "ctrl";
    shortcutString += "+";
    if (key.altKey) shortcutString += "alt";
    shortcutString += "+";
    if (key.shiftKey) shortcutString += "shift";
    shortcutString += "+";
    shortcutString += key.key;
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
    this.actionNames.set("createOutbound", "Create outbound strip");
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
