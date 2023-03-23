import {Component, Input} from '@angular/core';
import {Flightstrip} from "./flightstrip.model";

@Component({
  selector: 'app-flightstrip-container',
  templateUrl: './flightstrip-container.component.html',
  styleUrls: ['./flightstrip-container.component.scss']
})
export class FlightstripContainerComponent {
  @Input("stripModel") stripModel!: Flightstrip

  constructor() {

  }

}
