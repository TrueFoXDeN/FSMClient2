import {Injectable} from '@angular/core';

export enum ShortcutType {
  PRIMARY,
  SECONDARY
}

export class ShortcutObject {

}


@Injectable({
  providedIn: 'root'
})
export class ShortcutService {
  private primaryDefaultActionKeyConfig: Map<string, string> = new Map();
  private secondaryDefaultActionKeyConfig: Map<string, string> = new Map();
  private primaryShortcutsConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  private secondaryShortcutsConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  private componentActions: Map<string, Map<string, Function>> = new Map(); //Map<componentID, actionMap>
  private actionNames: Map<string, string> = new Map();

  constructor() {
    this.createDefaultActionKeyMaps()
    this.addDefaultShortcuts();
    this.insertActionNames();
  }


  createDefaultActionKeyMaps() {
    this.primaryDefaultActionKeyConfig.set("openSearchCallsign", "ctrl+++f");
    this.primaryDefaultActionKeyConfig.set("abortDeletion", "+++Escape");
    this.primaryDefaultActionKeyConfig.set("deleteFs", "+++x");
    this.primaryDefaultActionKeyConfig.set("toggleCompact", "+++c");
    this.primaryDefaultActionKeyConfig.set("prevStatus", "+++a");
    this.primaryDefaultActionKeyConfig.set("nextStatus", "+++d");
    this.primaryDefaultActionKeyConfig.set("createVfr", "+++v");
    this.primaryDefaultActionKeyConfig.set("createOutbound", "+++o");
    this.primaryDefaultActionKeyConfig.set("createInbound", "+++i");

    this.secondaryDefaultActionKeyConfig.set("prevStatus", "+++ArrowLeft");
    this.secondaryDefaultActionKeyConfig.set("nextStatus", "+++ArrowRight");
  }

  setShortcut(shortcutString: string, actionName: string, type: ShortcutType) {
    if (type === ShortcutType.PRIMARY) {
      for (let [key, value] of this.primaryShortcutsConfig) {
        if (value === actionName) {
          this.primaryShortcutsConfig.delete(key);
        }
      }
      this.primaryShortcutsConfig.set(shortcutString, actionName)
    } else {
      for (let [key, value] of this.secondaryShortcutsConfig) {
        if (value === actionName) {
          this.secondaryShortcutsConfig.delete(key);
        }
      }
      this.secondaryShortcutsConfig.set(shortcutString, actionName)
    }
  }

  checkIfShortcutExists(shortcutString: string) {
    return this.primaryShortcutsConfig.has(shortcutString) || this.secondaryShortcutsConfig.has(shortcutString);
  }

  registerComponentActions(componentID: string, actionMap: Map<string, Function>) {
    if (!this.componentActions.has(componentID)) {
      this.componentActions.set(componentID, actionMap);
    }
    //console.log(this.componentActions)
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


  getActionIdFromShortcut(shortcutString: string) {
    let actionName;
    if (this.primaryShortcutsConfig.has(shortcutString)) {
      actionName = this.primaryShortcutsConfig.get(shortcutString);
    } else {
      actionName = this.secondaryShortcutsConfig.get(shortcutString);
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
  addDefaultShortcuts() {
    this.primaryShortcutsConfig.set("ctrl+++f", "openSearchCallsign");
    this.primaryShortcutsConfig.set("+++Escape", "abortDeletion");
    this.primaryShortcutsConfig.set("+++x", "deleteFs");
    this.primaryShortcutsConfig.set("+++c", "toggleCompact");
    this.primaryShortcutsConfig.set("+++a", "prevStatus");
    this.primaryShortcutsConfig.set("+++d", "nextStatus");
    this.primaryShortcutsConfig.set("+++v", "createVfr");
    this.primaryShortcutsConfig.set("+++o", "createOutbound");
    this.primaryShortcutsConfig.set("+++i", "createInbound");

    this.secondaryShortcutsConfig.set("+++ArrowLeft", "prevStatus");
    this.secondaryShortcutsConfig.set("+++ArrowRight", "nextStatus");
  }


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
    return this.primaryShortcutsConfig;
  }

  getSecondaryConfig() {
    return this.secondaryShortcutsConfig;
  }

  getPrimaryDefaultConfig() {
    return this.primaryDefaultActionKeyConfig;
  }

  getSecondaryDefaultConfig() {
    return this.secondaryDefaultActionKeyConfig;
  }

  loadDefaultShortcuts() {
    this.primaryShortcutsConfig.clear();
    this.secondaryShortcutsConfig.clear();
    this.addDefaultShortcuts();
  }


  findShortcutInPrimaryConfig(actionName: string) {
    for (let [key, value] of this.primaryShortcutsConfig) {
      if (value === actionName) return key;
    }
    return ""
  }

  findShortcutInSecondaryConfig(actionName: string) {
    for (let [key, value] of this.secondaryShortcutsConfig) {
      if (value === actionName) return key;
    }
    return ""
  }

  checkIfKeyIsDefaultShortcut(key: string, isPrimaryKey: boolean) {
    if (isPrimaryKey) {
      let shortcut = this.findShortcutInPrimaryConfig(key);
      let defaultShortcut = this.primaryDefaultActionKeyConfig.get(key)
      if (!defaultShortcut) {
        defaultShortcut = ""
      }
      return defaultShortcut === shortcut;
    } else {
      let shortcut = this.findShortcutInSecondaryConfig(key);
      let defaultShortcut = this.secondaryDefaultActionKeyConfig.get(key)
      if (!defaultShortcut) {
        defaultShortcut = ""
      }
      return defaultShortcut === shortcut;
    }
  }


}
