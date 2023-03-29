import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Flightstrip, iconState, statusArrival, statusDeparture, statusVfr, stripType} from '../flightstrip.model';
import {Data} from "../../data";
import {FlightstripService} from "../flightstrip.service";
import {FlightStripContainer} from "../flightstrip-directives/flightStrip.directive";
import {FlightstripIcon} from "../flightstrip-directives/flightstripIcon.directive";
import {FlightStripInput} from "../flightstrip-directives/flightStripInput.directive";
import {StyleChangerService} from "../../services/style-changer.service";
import {MatMenuTrigger} from "@angular/material/menu";


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['./flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FlightStripContainer) fsContainerDir: any;
  @ViewChild(FlightstripIcon) fsIconDir: any;
  @ViewChild(FlightStripInput) fsInputDir: any;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Input() fs!: Flightstrip;
  @Input("isDragable") private isDragable = false;
  @Output("switchToCompact") compactSwitch = new EventEmitter<void>()
  @Output("nextStatus") nextStatusEvent = new EventEmitter<void>()
  @Output("prevStatus") prevStatusEvent = new EventEmitter<void>()
  subscriptionHandles: any = [];
  status: any;

  inputsDisabled = false;

  constructor(private globalData: Data, private fsService: FlightstripService, private styleChanger: StyleChangerService,
              ) {
    this.subscriptionHandles.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.checkStatus();
        this.fs.status = 0;
      }
    }));

    this.subscriptionHandles.push(this.fsService.dragChange.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.inputsDisabled = data.dragEnabled;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptionHandles.forEach((subscription: any) => {
      subscription.unsubscribe();
    })
  }


  checkStatus() {
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

  ngOnInit() {
    this.checkStatus()
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
    // this.fs.triangleIconState = 4
    this.fsContainerDir.onSquawkChange(this.fs.squawk)
    this.fsIconDir.onSquawkChange(this.fs.squawk)
    this.onInputFocusLost()
  }

  onInputFocus() {
    this.fsService.isInputFocused = true;
  }

  onInputFocusLost() {
    this.fsService.isInputFocused = false;
  }

  ngAfterViewInit(): void {
    this.onSquawkChange();
  }

  nextStatus() {
    this.nextStatusEvent.emit();
  }

  prevStatus() {
    this.prevStatusEvent.emit();
  }


  onContextOpened() {
    this.fsContainerDir.markForDeleteOperation()
  }

  onContextClosed() {
    this.fsContainerDir.updateStyle();
  }

}
