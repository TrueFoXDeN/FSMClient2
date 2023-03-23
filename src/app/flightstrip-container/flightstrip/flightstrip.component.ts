import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flightstrip, iconState, statusArrival, statusDeparture, statusVfr, stripType} from '../flightstrip.model';
import {Data} from "../../data";
import {findIndex} from "rxjs";
import {FlightstripService} from "../flightstrip.service";


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['./flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit {
  @Input() fs!: Flightstrip;
  @Output("switchToCompact") compactSwitch = new EventEmitter<void>()
  status: any;
  isMouseMoving: boolean = false;
  isMouseDown : boolean = false;

  constructor(private globalData: Data, private fsService: FlightstripService) {
  }

  ngOnInit() {
    switch (this.fs.type) {
      case stripType.OUTBOUND:
        this.status = statusDeparture
        break;
      case stripType.INBOUND:
        this.status = statusArrival
        break;
      case stripType.VFR:
        this.status = statusVfr
        break;
    }
  }

  changeToCompactMode() {
    this.compactSwitch.emit()
  }

  cycleTriangleState() {
    let enumCount = Object.keys(iconState).length / 2;
    let state = this.fs.triangleIconState;
    if (state < enumCount - 1) {
      state++;
    } else {
      state = 0;
    }
    this.fs.triangleIconState = state;
    this.fsService.changedTriangleState.next();
  }

  onSquawkChange() {
    this.fsService.changedSquawk.next(this.fs.squawk)
  }

  onMouseDown() {
    this.isMouseDown = true
    setTimeout(() => {
      if (!this.isMouseMoving && this.isMouseDown) {
        this.fsService.dragFlightstrip.next(true);
      }
    }, this.fsService.dragDelay - 10);
    this.isMouseMoving = false;
  }
  onMouseUp() {
    this.isMouseDown = false;
    this.fsService.dragFlightstrip.next(false);
  }


}
