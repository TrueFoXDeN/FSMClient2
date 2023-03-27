import {Component, Input, OnInit} from '@angular/core';
import {Flightstrip} from "./flightstrip.model";

@Component({
  selector: 'app-flightstrip-container',
  templateUrl: './flightstrip-container.component.html',
  styleUrls: ['./flightstrip-container.component.scss']
})
export class FlightstripContainerComponent implements OnInit {
  @Input("stripModel") stripModel!: Flightstrip
  @Input("colID") columnId!: string;

  constructor() {

  }

  ngOnInit(): void {
    if (this.stripModel.columnId != this.columnId) {
      this.stripModel.columnId = this.columnId
    }
  }


}
