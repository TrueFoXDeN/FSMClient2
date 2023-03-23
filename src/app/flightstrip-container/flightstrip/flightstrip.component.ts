import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Flightstrip, iconState, statusArrival, statusDeparture, statusVfr, stripType} from '../flightstrip.model';
import {Data} from "../../data";
import {findIndex, Subject} from "rxjs";
import {FlightstripService} from "../flightstrip.service";
import {FlightStripContainer} from "../flightstrip-directives/flightStripContainer.directive";
import {FlightstripIcon} from "../flightstrip-directives/flightstripIcon.directive";


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['./flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit {
  @ViewChild(FlightStripContainer) fsContainerDir: any;
  @ViewChild(FlightstripIcon) fsIconDir: any;
  @Input() fs!: Flightstrip;
  @Output("switchToCompact") compactSwitch = new EventEmitter<void>()
  status: any;
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;
  changedSquawk: Subject<string>;

  constructor(private globalData: Data, private fsService: FlightstripService) {
    this.changedSquawk = new Subject<string>()
    console.log(this.changedSquawk)
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
    this.fsContainerDir.onSquawkChange(this.fs.squawk)
    this.fsIconDir.onSquawkChange(this.fs.squawk)
  }

  onMouseDown() {
    this.isMouseDown = true
    setTimeout(() => {
      if (!this.isMouseMoving && this.isMouseDown) {
        this.fsContainerDir.onDragStart()
      }
    }, this.fsService.dragDelay);
    this.isMouseMoving = false;
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.fsContainerDir.onDragEnd()
  }

  onInputFocus() {
    this.fsService.isInputFocused = true;
  }

  onInputFocusLost() {
    this.fsService.isInputFocused = false;
  }


}
