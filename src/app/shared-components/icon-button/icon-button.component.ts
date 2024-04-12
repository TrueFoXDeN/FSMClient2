import {Component, Input} from '@angular/core';
import {FeatherModule} from "angular-feather";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [
    FeatherModule,
    NgClass
  ],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input() text = ''
  @Input() icon = ''
  @Input() disabled: boolean = false;
}
