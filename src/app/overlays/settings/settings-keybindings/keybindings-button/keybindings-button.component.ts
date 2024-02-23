import {Component, Input} from '@angular/core';
import {FeatherModule} from "angular-feather";

@Component({
  selector: 'app-keybindings-button',
  standalone: true,
  imports: [
    FeatherModule
  ],
  templateUrl: './keybindings-button.component.html',
  styleUrl: './keybindings-button.component.scss'
})
export class KeybindingsButtonComponent {
  @Input() text = ''
  @Input() icon = ''
}
