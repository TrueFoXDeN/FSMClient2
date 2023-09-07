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
import {
  Flightstrip,
  triangleIconState,
  statusArrival,
  statusDeparture,
  statusVfr,
  stripType,
  communicationIconState
} from '../flightstrip.model';
import {FlightstripService} from "../flightstrip.service";
import {FlightStripInput} from "../flightstrip-directives/flightStripInput.directive";
import {StyleChangerService} from "../../services/style-changer.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {DataService} from "../../services/data.service";


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['./flightstrip.component.scss', '../icon.scss']
})
export class FlightstripComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(FlightStripInput) fsInputDir: any;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  @Input() fs!: Flightstrip;
  @Output("switchToCompact") compactSwitch = new EventEmitter<void>()
  @Output("nextStatus") nextStatusEvent = new EventEmitter<void>()
  @Output("prevStatus") prevStatusEvent = new EventEmitter<void>()
  subscriptionHandles: any = [];
  status: any;
  stripTypes = stripType
  inputsDisabled = false;
  highlightActive = false;
  triangleIconStates = triangleIconState
  communicationIconStates = communicationIconState

  constructor(private dataService: DataService, private fsService: FlightstripService, private styleChanger: StyleChangerService,
  ) {
    this.subscriptionHandles.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.checkStatus();
        this.fs.status = 0;
      }
    }));

    this.subscriptionHandles.push(this.fsService.searchFlightstrip.subscribe(() => {
      if (this.fs.isMarkedBySearch) {
        this.highlightActive = true;
        this.fs.isMarkedBySearch = false;
        setTimeout(() => {
          this.highlightActive = false;
        }, 8000);
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

  getAirlineName(icaoCode: string) {
      this.fsService.getAirlineCallsign(icaoCode).subscribe({
        next: (response: any) => {
          this.fs.airline = response.airline
        },
        error: (err) => {
          console.log(err)
        }
      });
  }


  cycleTriangleState() {
    let enumCount = Object.keys(triangleIconState).length / 2;
    let state = this.fs.triangleIconState;
    if (state < enumCount - 1) {
      state++;
    } else {
      state = 0;
    }
    this.fs.triangleIconState = state;
    this.fsService.changedTriangleState.next();
  }

  cycleCommunicationState() {
    let enumCount = Object.keys(communicationIconState).length / 2;
    let state = this.fs.communicationIconState;
    if (state < enumCount - 1) {
      state++;
    } else {
      state = 0;
    }
    this.fs.communicationIconState = state;
    this.fsService.changedCommunicationState.next();
  }

  onSquawkChange() {
    if (this.fs.squawk == "7500" || this.fs.squawk == "7600" || this.fs.squawk == "7700") {
      this.fs.triangleIconState = 4
    }
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

  }

  onContextClosed() {

  }

  onCallsignChange() {
    if (this.fs.callsign.length >= 3 && this.fs.airline == "") {
      this.getAirlineName(this.fs.callsign.substring(0, 3))
    }

  }

}
