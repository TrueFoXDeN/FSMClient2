import {Injectable} from '@angular/core';
import {DefaultShortcutSettingsService} from "./default-shortcut-settings.service";
import {LocalStorageHandlingService} from "./local-storage-handling.service";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public shortcut_primaryShortcutStringConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  public shortcut_tempPrimaryShortcutStringConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  public shortcut_secondaryShortcutStringConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>
  public shortcut_tempSecondaryShortcutStringConfig: Map<string, string> = new Map();  //Map<shortcutString, ActionName>

  public shortcut_primaryActionKeyConfig: Map<string, string> = new Map();
  public shortcut_tempPrimaryActionKeyConfig: Map<string, string> = new Map();
  public shortcut_secondaryActionKeyConfig: Map<string, string> = new Map();
  public shortcut_tempSecondaryActionKeyConfig: Map<string, string> = new Map();

  constructor(private defaultShortcutService: DefaultShortcutSettingsService, private localStorageHandler: LocalStorageHandlingService) {
    this.loadConfig();
  }

  loadConfig() {
    let config = this.localStorageHandler.loadShortcutConfig();

    this.shortcut_primaryShortcutStringConfig = config["primary"];
    this.shortcut_secondaryShortcutStringConfig = config["secondary"];
    this.shortcut_tempPrimaryShortcutStringConfig = new Map(this.shortcut_primaryShortcutStringConfig);
    this.shortcut_tempSecondaryShortcutStringConfig = new Map(this.shortcut_secondaryShortcutStringConfig);

    this.shortcut_primaryActionKeyConfig = config["primaryAction"];
    this.shortcut_secondaryActionKeyConfig = config["secondaryAction"];
    this.shortcut_tempPrimaryActionKeyConfig = new Map(this.shortcut_primaryActionKeyConfig);
    this.shortcut_tempSecondaryActionKeyConfig = new Map(this.shortcut_secondaryActionKeyConfig);
  }

  copyActualKeybindingsBackToTempConfig() {
    this.shortcut_tempPrimaryShortcutStringConfig = new Map(this.shortcut_primaryShortcutStringConfig);
    this.shortcut_tempSecondaryShortcutStringConfig = new Map(this.shortcut_secondaryShortcutStringConfig);
    this.shortcut_tempPrimaryActionKeyConfig = new Map(this.shortcut_primaryActionKeyConfig);
    this.shortcut_tempSecondaryActionKeyConfig = new Map(this.shortcut_secondaryActionKeyConfig);
  }

  copyTempKeybindingsToActualConfig() {
    this.shortcut_primaryShortcutStringConfig = new Map(this.shortcut_tempPrimaryShortcutStringConfig);
    this.shortcut_secondaryShortcutStringConfig = new Map(this.shortcut_tempSecondaryShortcutStringConfig);
    this.shortcut_primaryActionKeyConfig = new Map(this.shortcut_tempPrimaryActionKeyConfig)
    this.shortcut_secondaryActionKeyConfig = new Map(this.shortcut_tempSecondaryActionKeyConfig)
  }

  saveSettingsToLocalstorage() {
    let config = {
      "primaryAction": this.shortcut_primaryActionKeyConfig,
      "secondaryAction": this.shortcut_secondaryActionKeyConfig

    }
    this.localStorageHandler.saveShortcutConfig(config);
  }
}
