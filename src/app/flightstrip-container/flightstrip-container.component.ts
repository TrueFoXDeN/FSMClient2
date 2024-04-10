import {Component, EventEmitter, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Flightstrip, StatusArrival, StatusDeparture, StatusVfr, StripType} from "./flightstrip.model";
import {HttpClient} from "@angular/common/http";
import {NetworkService} from "../services/network.service";
import {environment} from "../../environments/environment";
import {FlightstripService} from "./flightstrip.service";
import {DataService} from "../services/data.service";
import {ShortcutService} from "../services/shortcut.service";
import {MultiplayerSendService} from "../services/multiplayer-send.service";

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
  isMouseOver: boolean = false
  actionNames: Map<string, Function> = new Map();

  constructor(private networkService: NetworkService, private fsService: FlightstripService, private dataService: DataService,
              private shortcutService: ShortcutService, private mpService: MultiplayerSendService) {
    this.subscriptionHandles.push(
      this.networkService.networkEmitter.subscribe(() => {
        this.onCheckCallsignTrigger()
      }),
      this.fsService.changedStripPos.subscribe((data) => {
        if (this.stripModel.id == data.id) {
          this.stripModel.columnPosition = data.newPosition
        }
      }),
      this.fsService.changedType.subscribe((data) => {
        if (data.id == this.stripModel.id) {
          this.stripModel.type = data.type;
        }
      })
    );

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
    this.actionNames.set("deleteFs", () => this.checkFsDeletion())
    this.actionNames.set("toggleCompact", () => this.toggleCompactMode())
    this.actionNames.set("nextStatus", () => this.setNextStatus())
    this.actionNames.set("prevStatus", () => this.setPrevStatus())
    this.shortcutService.registerComponentActions(this.stripModel.id, this.actionNames);
  }


  nextStatus() {
    this.checkTypeBeforeStatusChange(1)
  }

  prevStatus() {
    this.checkTypeBeforeStatusChange(-1)
  }

  checkTypeBeforeStatusChange(direction: number) {
    switch (this.stripModel.type) {
      case StripType.OUTBOUND:
        this.setStatus(direction, StatusDeparture)
        break;
      case StripType.INBOUND:
        this.setStatus(direction, StatusArrival)
        break;
      case StripType.VFR:
        this.setStatus(direction, StatusVfr)
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
    this.stripModel.statusText = object[state];
    this.mpService.processMessage("edit_flightstrip", this.stripModel)
  }


  onCheckCallsignTrigger() {
    let network = this.networkService.getNetwork();
    if (!this.stripModel.infosPulled && this.stripModel.callsign != "") {
      this.fsService.getFlightstripByCallsign(this.stripModel.callsign, network).subscribe({
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
            this.mpService.processMessage("edit_flightstrip", this.stripModel)
          }
        },
        error: (err) => {
          this.networkService.triggerError()
        }
      });
    }
  }


  onMouseEnter(e: MouseEvent) {
    this.isMouseOver = true
  }

  onMouseLeave(e: MouseEvent) {
    this.isMouseOver = false
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(e: KeyboardEvent) {
    if (this.isMouseOver && !this.fsService.isInputFocused) {
      this.shortcutService.executeShortcut(this.stripModel.id, e);
    }
  }

  checkFsDeletion() {
    if (!this.stripModel.deleteActive) {
      this.stripModel.deleteActive = true
    } else {
      let index = this.dataService.flightstripData[this.stripModel.columnId].flightstrips.indexOf(this.stripModel);
      this.mpService.processMessage("delete_flightstrip", {fsId: this.stripModel.id, colId: this.stripModel.columnId});
      this.dataService.flightstripData[this.stripModel.columnId].flightstrips.splice(index, 1);

    }
  }

  toggleCompactMode() {
    this.stripModel.compactMode = !this.stripModel.compactMode;
  }

  setNextStatus() {
    this.nextStatus()
  }

  setPrevStatus() {
    this.prevStatus()
  }
}
