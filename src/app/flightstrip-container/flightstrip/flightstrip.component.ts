import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Flightstrip, iconState, statusArrival, statusDeparture, statusVfr, stripType} from '../flightstrip.model';
import {Data} from "../../data";
import {FlightstripService} from "../flightstrip.service";
import {FlightStripContainer} from "../flightstrip-directives/flightStrip.directive";
import {FlightstripIcon} from "../flightstrip-directives/flightstripIcon.directive";
import {FlightStripInput} from "../flightstrip-directives/flightStripInput.directive";
import {StyleChangerService} from "../../services/style-changer.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {HttpClient} from '@angular/common/http';
import {NetworkService, networkType} from "../../services/network.service";


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
  @Output("switchToCompact") compactSwitch = new EventEmitter<void>()
  subscriptionHandles: any = [];
  status: any;

  constructor(private globalData: Data, private fsService: FlightstripService, private styleChanger: StyleChangerService,
              private http: HttpClient, private networkService: NetworkService) {
    this.subscriptionHandles.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.checkStatus();
        this.fs.status = 0;
      }
    }))
    this.subscriptionHandles.push(this.networkService.oneSecNetworkEmitter.subscribe(() => {
      this.onCheckCallsignTrigger()
    }))
  }

  ngOnDestroy(): void {
    this.subscriptionHandles.forEach((subscription: any) => {
      subscription.unsubscribe();
    })
    // this.fsService.changedType.unsubscribe();
    // this.networkService.oneSecNetworkEmitter.unsubscribe();
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

  onDrag() {
    this.fsInputDir.onDrag();
  }

  ngAfterViewInit(): void {
    this.onSquawkChange();
  }

  nextStatus() {
    this.checkTypeBeforeStatusChange(1)
  }

  prevStatus() {
    this.checkTypeBeforeStatusChange(-1)
  }

  checkTypeBeforeStatusChange(direction: number) {
    switch (this.fs.type) {
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
    let state = this.fs.status;
    if (state < enumCount - 1 && increment == 1) {
      state++;
    } else if (state > 0 && increment == -1) {
      state--;
    }
    this.fs.status = state;
  }

  onContextOpened() {
    this.fsContainerDir.markForDeleteOperation()
  }

  onContextClosed() {
    this.fsContainerDir.updateStyle();
  }

  onCheckCallsignTrigger() {
    let network = this.networkService.getNetwork();
    if (!this.fs.infosPulled && this.fs.callsign != "") {
      this.http.get(`http://192.168.178.20/${network}/callsign/` + this.fs.callsign).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.fs.callsign = response.callsign
            this.fs.squawk = response.squawk
            this.fs.departureIcao = response.departure
            this.fs.arrivalIcao = response.arrival
            this.fs.aircraft = response.aircraft
            this.fs.wakeCategory = response.wake
            this.fs.flightrule = response.flightrule
            this.fs.route = response.route
            this.fs.infosPulled = true;
          }
        },
        error: (err) => {
        }
      });

    }
  }


}
