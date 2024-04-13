import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {
  CommunicationIconState,
  Flightstrip,
  StatusArrival,
  StatusDeparture,
  StatusVfr,
  StripType,
  TriangleIconState
} from '../flightstrip.model';
import {FlightstripService} from "../flightstrip.service";
import {FlightStripInput} from "../flightstrip-directives/flightStripInput.directive";
import {StyleChangerService} from "../../services/style-changer.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {DataService} from "../../services/data.service";
import {Util} from "../../util";
import {MultiplayerSendService} from "../../services/multiplayer-send.service";


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
  stripTypes = StripType
  inputsDisabled = false;
  highlightActive = false;
  triangleIconStates = TriangleIconState
  communicationIconStates = CommunicationIconState
  fsModelBackup: Flightstrip;

  constructor(private dataService: DataService, private fsService: FlightstripService, private styleChanger: StyleChangerService,
              private util: Util, private mpService: MultiplayerSendService) {
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
    this.fsModelBackup = new Flightstrip(this.util.generateUUID(), StripType.INBOUND, this.util.generateUUID(), 0);
  }

  ngOnDestroy(): void {
    this.subscriptionHandles.forEach((subscription: any) => {
      subscription.unsubscribe();
    })
  }


  checkStatus() {
    switch (this.fs.type) {
      case StripType.OUTBOUND:
        this.status = StatusDeparture
        break;
      case StripType.INBOUND:
        this.status = StatusArrival
        break;
      case StripType.VFR:
        this.status = StatusVfr
        break;
    }
  }

  ngOnInit() {
    this.checkStatus()
    this.fsModelBackup = JSON.parse(JSON.stringify(this.fs));
  }

  changeToCompactMode() {
    this.compactSwitch.emit()
  }

  getAirlineName(icaoCode: string) {
    this.fsService.getAirlineCallsign(icaoCode).subscribe({
      next: (response: any) => {
        this.fs.airline = response.airline
        this.mpService.processMessage("edit_flightstrip", this.fs);
      },
      error: (err) => {
      }
    });
  }


  cycleTriangleState() {
    let enumCount = Object.keys(TriangleIconState).length / 2;
    let state = this.fs.triangleIconState;
    if (state < enumCount - 1) {
      state++;
    } else {
      state = 0;
    }
    this.fs.triangleIconState = state;
    this.fsService.changedTriangleState.next();
    this.mpService.processMessage("edit_flightstrip", this.fs);
  }

  cycleCommunicationState() {
    let enumCount = Object.keys(CommunicationIconState).length / 2;
    let state = this.fs.communicationIconState;
    if (state < enumCount - 1) {
      state++;
    } else {
      state = 0;
    }
    this.fs.communicationIconState = state;
    this.fsService.changedCommunicationState.next();
    this.mpService.processMessage("edit_flightstrip", this.fs);
  }

  onSquawkChange() {
    if (this.fs.squawk == "7500" || this.fs.squawk == "7600" || this.fs.squawk == "7700") {
      this.fs.triangleIconState = 4
      this.fs.emergencyActive = true
    } else {
      this.fs.emergencyActive = false
    }
    this.onInputFocusLost()
  }


  onInputFocus() {
    this.fsService.isInputFocused = true;
    this.fsModelBackup = JSON.parse(JSON.stringify(this.fsModelBackup));
  }

  onInputFocusLost() {
    this.fsService.isInputFocused = false;

    let changeCount = 0;
    changeCount += this.fsModelBackup.type != this.fs.type ? 1 : 0;
    changeCount += this.fsModelBackup.triangleIconState != this.fs.triangleIconState ? 1 : 0;
    changeCount += this.fsModelBackup.communicationIconState != this.fs.communicationIconState ? 1 : 0;
    changeCount += this.fsModelBackup.callsign != this.fs.callsign ? 1 : 0;
    changeCount += this.fsModelBackup.departureIcao != this.fs.departureIcao ? 1 : 0;
    changeCount += this.fsModelBackup.arrivalIcao != this.fs.arrivalIcao ? 1 : 0;
    changeCount += this.fsModelBackup.aircraft != this.fs.aircraft ? 1 : 0;
    changeCount += this.fsModelBackup.status != this.fs.status ? 1 : 0;
    changeCount += this.fsModelBackup.statusText != this.fs.statusText ? 1 : 0;
    changeCount += this.fsModelBackup.wakeCategory != this.fs.wakeCategory ? 1 : 0;
    changeCount += this.fsModelBackup.flightrule != this.fs.flightrule ? 1 : 0;
    changeCount += this.fsModelBackup.altitude != this.fs.altitude ? 1 : 0;
    changeCount += this.fsModelBackup.gate != this.fs.gate ? 1 : 0;
    changeCount += this.fsModelBackup.info != this.fs.info ? 1 : 0;
    changeCount += this.fsModelBackup.airline != this.fs.airline ? 1 : 0;
    changeCount += this.fsModelBackup.squawk != this.fs.squawk ? 1 : 0;
    changeCount += this.fsModelBackup.sidStar != this.fs.sidStar ? 1 : 0;
    changeCount += this.fsModelBackup.freeText != this.fs.freeText ? 1 : 0;
    changeCount += this.fsModelBackup.route != this.fs.route ? 1 : 0;
    changeCount += this.fsModelBackup.emergencyActive != this.fs.emergencyActive ? 1 : 0;
    if (changeCount > 0) {
      console.log("Old: ")
      console.log(this.fsModelBackup);
      console.log("new:");
      console.log(this.fs);
      this.mpService.processMessage("edit_flightstrip", this.fs);
    }
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
