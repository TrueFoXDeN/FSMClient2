import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-proximity-row-button',
  templateUrl: './proximity-row-button.component.html',
  styleUrls: ['./proximity-row-button.component.scss']
})
export class ProximityRowButtonComponent {
  @Input() text = ''
  @Input() icon = ''
}
