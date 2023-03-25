import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-flightstrip-button',
  templateUrl: './flightstrip-button.component.html',
  styleUrls: ['./flightstrip-button.component.scss']
})
export class FlightstripButtonComponent {
  @Input() text = ''
  @Input() icon = ''

  @Input() size = '100%'

  constructor() { }

  ngOnInit(): void {
  }

}
