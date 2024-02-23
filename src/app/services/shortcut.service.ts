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

  private primaryShortcutsConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  private secondaryShortcutsConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  private componentActions: Map<string, Map<string, Function>> = new Map(); //Map<componentID, actionMap>

  constructor() {
    this.addDefaultShortcuts();
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
    console.log(this.componentActions)
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
    this.primaryShortcutsConfig.set("ctrl+++f", "openSearchCallsign")
    this.primaryShortcutsConfig.set("+++Escape", "abortDeletion")
  }

}
