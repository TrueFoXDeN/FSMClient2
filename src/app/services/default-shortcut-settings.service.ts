import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultShortcutSettingsService {
  private primaryDefaultActionKeyConfig: Map<string, string> = new Map();
  private secondaryDefaultActionKeyConfig: Map<string, string> = new Map();
  private primaryDefaultShortcutStringConfig: Map<string, string> = new Map();
  private secondaryDefaultShortcutStringConfig: Map<string, string> = new Map();

  constructor() {
    this.createDefaultActionKeyMaps();
    this.createDefaultShortcutConfig();
  }


  private createDefaultActionKeyMaps() {
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

  private createDefaultShortcutConfig(){
    this.primaryDefaultShortcutStringConfig.set("ctrl+++f", "openSearchCallsign");
    this.primaryDefaultShortcutStringConfig.set("+++Escape", "abortDeletion");
    this.primaryDefaultShortcutStringConfig.set("+++x", "deleteFs");
    this.primaryDefaultShortcutStringConfig.set("+++c", "toggleCompact");
    this.primaryDefaultShortcutStringConfig.set("+++a", "prevStatus");
    this.primaryDefaultShortcutStringConfig.set("+++d", "nextStatus");
    this.primaryDefaultShortcutStringConfig.set("+++v", "createVfr");
    this.primaryDefaultShortcutStringConfig.set("+++o", "createOutbound");
    this.primaryDefaultShortcutStringConfig.set("+++i", "createInbound");

    this.secondaryDefaultShortcutStringConfig.set("+++ArrowLeft", "prevStatus");
    this.secondaryDefaultShortcutStringConfig.set("+++ArrowRight", "nextStatus");
  }

  getPrimaryDefaultActionConfig() {
    return this.primaryDefaultActionKeyConfig;
  }

  getSecondaryDefaultActionConfig() {
    return this.secondaryDefaultActionKeyConfig;
  }

  getPrimaryShortcutsConfig() {
    return this.primaryDefaultShortcutStringConfig;
  }

  getSecondaryShortcutsConfig() {
    return this.secondaryDefaultShortcutStringConfig;
  }

  checkIfKeyIsDefaultShortcut(shortcut: string, key: string, isPrimaryKey: boolean) {
    if (isPrimaryKey) {
      let defaultShortcut = this.primaryDefaultActionKeyConfig.get(key)
      if (!defaultShortcut) {
        defaultShortcut = ""
      }
      return defaultShortcut === shortcut;
    } else {
      let defaultShortcut = this.secondaryDefaultActionKeyConfig.get(key)
      if (!defaultShortcut) {
        defaultShortcut = ""
      }
      return defaultShortcut === shortcut;
    }
  }
}
