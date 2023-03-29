import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from "./flightstrip.model";

@Component({
  selector: 'app-flightstrip-container',
  templateUrl: './flightstrip-container.component.html',
  styleUrls: ['./flightstrip-container.component.scss']
})
export class FlightstripContainerComponent implements OnInit, OnDestroy {
  @Input("stripModel") stripModel!: Flightstrip
  @Input("colID") columnId!: string;

  constructor() {

  }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    if (this.stripModel.columnId != this.columnId) {
      this.stripModel.columnId = this.columnId
    }
  }


  nextStatus() {
    this.checkTypeBeforeStatusChange(1)
  }

  prevStatus() {
    this.checkTypeBeforeStatusChange(-1)
  }

  checkTypeBeforeStatusChange(direction: number) {
    switch (this.stripModel.type) {
      case stripType.OUTBOUND:
        this.setStatus(direction, statusDeparture)
        break;
      case stripType.INBOUND:
        this.setStatus(direction, statusArrival)
        break;
      case stripType.VFR:
        this.setStatus(direction, statusVfr)
        break;
    }
  }

  setStatus(increment: number, object: any) {
    let enumCount = Object.keys(object).length / 2;
    let state = this.stripModel.status;
    if (state < enumCount - 1 && increment == 1) {
      state++;
    } else if (state > 0 && increment == -1) {
      state--;
    }
    this.stripModel.status = state;
  }


}
