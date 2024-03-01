import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {SettingsKeybindingsDirective} from "./settings-keybindings.directive";
import {KeybindingsButtonComponent} from "./keybindings-button/keybindings-button.component";
import {ShortcutService} from "../../../services/shortcut.service";
import {NgClass} from "@angular/common";
import {KeybindingsPipe} from "./keybindings.pipe";


export interface KeybindingConfig {
  actionName: string,
  name: string,
  primaryConfig: string,
  secondaryConfig: string,
  isPrimaryDefault: boolean,
  isSecondaryDefault: boolean,
  isRecording: boolean
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
  names: Map<string, string> = new Map()
  primaryConfig: Map<string, string> = new Map();
  secondaryConfig: Map<string, string> = new Map();

  constructor(private shortcutService: ShortcutService) {
    this.names = this.shortcutService.getActionNames();
    this.primaryConfig = this.shortcutService.getPrimaryConfig();
    this.secondaryConfig = this.shortcutService.getSecondaryConfig();
    this.loadDataIntoConfig();
  }


  loadDataIntoConfig() {
    for (let key of this.names.keys()) {
      let config = {
        actionName: key,
        name: this.names.get(key),
        primaryConfig: this.shortcutService.findShortcutInPrimaryConfig(key),
        secondaryConfig: this.shortcutService.findShortcutInSecondaryConfig(key),
        isPrimaryDefault: this.shortcutService.checkIfKeyIsDefaultShortcut(key, true),
        isSecondaryDefault: this.shortcutService.checkIfKeyIsDefaultShortcut(key, false),
        isRecording: false
      }
      this.configData.push(<KeybindingConfig>config);
    }
    console.log(this.configData)
  }


  onInputClick(config: KeybindingConfig) {
    console.log(config);
  }
}
