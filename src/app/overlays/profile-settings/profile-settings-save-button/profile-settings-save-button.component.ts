import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-settings-button',
  templateUrl: './profile-settings-save-button.component.html',
  styleUrls: ['./profile-settings-save-button.component.scss']
})
export class ProfileSettingsSaveButtonComponent {
  @Input() text = ''
  @Input() icon = ''

  constructor() { }

  ngOnInit(): void {
  }

}
