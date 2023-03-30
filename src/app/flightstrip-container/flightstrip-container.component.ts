import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from "./flightstrip.model";
import {HttpClient} from "@angular/common/http";
import {NetworkService} from "../services/network.service";
import {environment} from "../../environments/environment";
import {FlightstripService} from "./flightstrip.service";

@Component({
  selector: 'app-flightstrip-container',
  templateUrl: './flightstrip-container.component.html',
  styleUrls: ['./flightstrip-container.component.scss']
})
export class FlightstripContainerComponent implements OnInit, OnDestroy {
  @Input("stripModel") stripModel!: Flightstrip
  @Input("colID") columnId!: string;
  subscriptionHandles: any = [];
  baseURL = environment.baseURL

  constructor(private http: HttpClient, private networkService: NetworkService, private fsService: FlightstripService) {
    this.subscriptionHandles.push(this.networkService.networkEmitter.subscribe(() => {
      this.onCheckCallsignTrigger()
    }))
  }

  ngOnDestroy(): void {
    this.subscriptionHandles.forEach((sub: any) => {
      sub.unsubscribe();
    });
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


  onCheckCallsignTrigger() {
    let network = this.networkService.getNetwork();
    if (!this.stripModel.infosPulled && this.stripModel.callsign != "") {
      this.http.get(`${this.baseURL}/${network}/callsign/` + this.stripModel.callsign).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.stripModel.callsign = response.callsign
            this.stripModel.squawk = response.squawk
            this.stripModel.departureIcao = response.departure
            this.stripModel.arrivalIcao = response.arrival
            this.stripModel.aircraft = response.aircraft
            this.stripModel.wakeCategory = response.wake
            this.stripModel.flightrule = response.flightrule
            this.stripModel.route = response.route
            this.stripModel.infosPulled = true;
          }
        },
        error: (err) => {
        }
      });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (!this.fsService.isInputFocused && event.key == "c") {
      this.stripModel.compactMode = !this.stripModel.compactMode;
    }
  }
}
