import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-proximity-button',
  templateUrl: './proximity-button.component.html',
  styleUrls: ['./proximity-button.component.scss']
})

export class ProximityButtonComponent {
  @Input() text = ''
  @Input() icon = ''

}
