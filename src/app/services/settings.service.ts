import {Injectable} from '@angular/core';
import {DefaultShortcutSettingsService} from "./default-shortcut-settings.service";

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

  constructor(private defaultShortcutService: DefaultShortcutSettingsService) {
    this.loadDefaultShortcutsIntoConfig();
    this.loadDefaultActionKeyConfig();
  }

  loadDefaultShortcutsIntoConfig() {
    this.shortcut_primaryShortcutStringConfig = this.defaultShortcutService.getPrimaryShortcutsConfig();
    this.shortcut_secondaryShortcutStringConfig = this.defaultShortcutService.getSecondaryShortcutsConfig();
    this.shortcut_tempPrimaryShortcutStringConfig = this.shortcut_primaryShortcutStringConfig;
    this.shortcut_tempSecondaryShortcutStringConfig = this.shortcut_secondaryShortcutStringConfig;
  }

  loadDefaultActionKeyConfig() {
    this.shortcut_primaryActionKeyConfig = this.defaultShortcutService.getPrimaryDefaultActionConfig();
    this.shortcut_secondaryActionKeyConfig = this.defaultShortcutService.getSecondaryDefaultActionConfig();
    this.shortcut_tempPrimaryActionKeyConfig = this.shortcut_primaryActionKeyConfig;
    this.shortcut_tempSecondaryActionKeyConfig = this.shortcut_secondaryActionKeyConfig;
  }
}
