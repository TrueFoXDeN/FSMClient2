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
    this.shortcut_tempPrimaryShortcutStringConfig = this.shortcut_primaryShortcutStringConfig;
    this.shortcut_tempSecondaryShortcutStringConfig = this.shortcut_secondaryShortcutStringConfig;

    this.shortcut_primaryActionKeyConfig = config["primaryAction"];
    this.shortcut_secondaryActionKeyConfig = config["secondaryAction"];
    this.shortcut_tempPrimaryActionKeyConfig = this.shortcut_primaryActionKeyConfig;
    this.shortcut_tempSecondaryActionKeyConfig = this.shortcut_secondaryActionKeyConfig;
  }
}
