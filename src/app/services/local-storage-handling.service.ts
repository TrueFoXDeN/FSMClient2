import {Injectable} from '@angular/core';
import {DefaultShortcutSettingsService} from "./default-shortcut-settings.service";
import {SnackbarMessageService} from "./snackbar-message.service";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageHandlingService {

  constructor(private defaultShortcutConfigService: DefaultShortcutSettingsService, private snackbarService: SnackbarMessageService) {
  }

  loadShortcutConfig(): any {
    if (localStorage.getItem("shortcutConfig") != null) {
      let config = JSON.parse(localStorage.getItem("shortcutConfig") || '{}')
      return this.validateActionKeyConfig(config)
    } else {
      return this.writeAndUseDefaultConfig(false);
    }
  }

  saveShortcutConfig(config: any) {
    let primaryShortcutConfig: Record<string, string> = this.mapToObject(config["primaryAction"]);
    let secondaryShortcutConfig: Record<string, string> = this.mapToObject(config["secondaryAction"]);
    let storage = {
      "primaryAction": primaryShortcutConfig,
      "secondaryAction": secondaryShortcutConfig
    }
    localStorage.setItem("shortcutConfig", JSON.stringify(storage));
  }

  writeDefaultActionKeyConfigToLocalStorage() {
    let primaryActionConfig: Record<string, string> = this.mapToObject(this.defaultShortcutConfigService.getPrimaryDefaultActionConfig())
    let secondaryActionConfig: Record<string, string> = this.mapToObject(this.defaultShortcutConfigService.getSecondaryDefaultActionConfig())
    let storage = {
      "primaryAction": primaryActionConfig,
      "secondaryAction": secondaryActionConfig
    };
    localStorage.setItem("shortcutConfig", JSON.stringify(storage));
  }

  validateActionKeyConfig(config: any) {
    let primaryAction = config["primaryAction"]
    let secondaryAction = config["secondaryAction"]
    let faultyConfigMarker = false
    if (primaryAction === undefined || secondaryAction === undefined) {
      return this.writeAndUseDefaultConfig(true);
    } else {
      let primaryMap = this.objectToMap(primaryAction)
      let secondaryMap = this.objectToMap(secondaryAction)
      this.defaultShortcutConfigService.getPrimaryDefaultActionConfig().forEach((value, key) => {
        if (!primaryMap.has(key)) {
          faultyConfigMarker = true;
          // console.log(`${key} not found in primary config`)
        }
      });
      this.defaultShortcutConfigService.getSecondaryDefaultActionConfig().forEach((value, key) => {
        if (!secondaryMap.has(key)) {
          faultyConfigMarker = true;
          // console.log(`${key} not found in secondary config`)
        }
      });
      if (faultyConfigMarker) {
        return this.writeAndUseDefaultConfig(true);
      } else {
        const primaryShortcut: Map<string, string> = new Map<string, string>();
        const secondaryShortcut: Map<string, string> = new Map<string, string>();
        primaryMap.forEach((value: string, key: string) => {
          if (!primaryShortcut.has(value)) {
            primaryShortcut.set(value, key);
          } else {
            faultyConfigMarker = true;
          }
        });
        secondaryMap.forEach((value: string, key: string) => {
          if (!secondaryShortcut.has(value)) {
            secondaryShortcut.set(value, key);
          } else {
            faultyConfigMarker = true;
          }
        });
        if (faultyConfigMarker) {
          return this.writeAndUseDefaultConfig(true);
        } else {
          return {
            "primary": primaryShortcut,
            "secondary": secondaryShortcut,
            "primaryAction": primaryMap,
            "secondaryAction": secondaryMap
          }
        }
      }
    }
  }

  writeAndUseDefaultConfig(isError: boolean) {
    this.writeDefaultActionKeyConfigToLocalStorage();
    let primary = this.defaultShortcutConfigService.getPrimaryShortcutsConfig();
    let primaryAction = this.defaultShortcutConfigService.getPrimaryDefaultActionConfig();
    let secondary = this.defaultShortcutConfigService.getSecondaryShortcutsConfig();
    let secondaryAction = this.defaultShortcutConfigService.getSecondaryDefaultActionConfig();
    return {
      "primary": primary,
      "secondary": secondary,
      "primaryAction": primaryAction,
      "secondaryAction": secondaryAction
    };
  }

  mapToObject(map
                :
                Map<string, string>
  ) {
    let obj: Record<string, string> = {};
    map.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  objectToMap(obj
                :
                any
  ) {
    const map = new Map<string, string>();
    Object.keys(obj).forEach(key => {
      map.set(key, obj[key]);
    });
    return map;
  }
}
