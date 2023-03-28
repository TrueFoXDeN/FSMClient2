import {Component} from '@angular/core';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})

export class ProfileSettingsComponent {
  profiles: any = []
  selectedProfile: any = {}

  constructor() {
    this.profiles.push({name: "EDDF GND", value: "EDDF GND"})
    this.profiles.push({name: "EDDF TWR", value: "EDDF TWR"})
  }
}
