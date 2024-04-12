import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Flightstrip, StripType} from "../flightstrip.model";
import {FlightstripService} from "../flightstrip.service";
import {DataService} from "../../services/data.service";
import {ProximityService} from "../../overlays/proximity-settings/proximity.service";
import {MultiplayerSendService} from "../../services/multiplayer-send.service";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input("fs") fs!: Flightstrip
  switchOption1: string = ""
  switchOption2: string = ""
  compactIcon: string = ""
  compactText: string = ""

  option1: StripType = StripType.INBOUND
  option2: StripType = StripType.INBOUND

  constructor(private dataService: DataService, private proximityService: ProximityService, private fsService: FlightstripService, private mpService: MultiplayerSendService) {

  }

  finishStrip() {
    this.proximityService.finishedAircrafts.push(this.fs.callsign)
    let index = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
    this.mpService.processMessage("delete_flightstrip", {fsId: this.fs.id, colId: this.fs.columnId});
    this.dataService.flightstripData[this.fs.columnId].flightstrips.splice(index, 1)
  }

  deleteStrip() {
    let index = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
    this.mpService.processMessage("delete_flightstrip", {fsId: this.fs.id, colId: this.fs.columnId});
    this.dataService.flightstripData[this.fs.columnId].flightstrips.splice(index, 1);

  }

  archiveStrip() {
    this.dataService.archivedStrips[this.fs.id] = this.fs
    this.deleteStrip();
  }

  switchToOption(optionNumber: number) {
    switch (optionNumber) {
      case 1:
        let index: number = 0
        index = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
        this.dataService.flightstripData[this.fs.columnId].flightstrips[index].type = this.option1
        this.fsService.changedType.next({type: this.option1, id: this.fs.id});
        this.mpService.processMessage("edit_flightstrip", this.fs);
        break;
      case 2:
        let index2: number = 0;
        index2 = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
        this.dataService.flightstripData[this.fs.columnId].flightstrips[index2].type = this.option2
        this.fsService.changedType.next({type: this.option2, id: this.fs.id});
        this.mpService.processMessage("edit_flightstrip", this.fs);
        break;
    }
  }

  ngOnInit(): void {
    switch (this.fs.type) {
      case StripType.INBOUND:
        this.switchOption1 = "Outbound";
        this.switchOption2 = "VFR"
        this.option1 = StripType.OUTBOUND;
        this.option2 = StripType.VFR;
        break;
      case StripType.OUTBOUND:
        this.switchOption1 = "Inbound";
        this.switchOption2 = "VFR"
        this.option1 = StripType.INBOUND;
        this.option2 = StripType.VFR;
        break;
      case StripType.VFR:
        this.switchOption1 = "Inbound";
        this.switchOption2 = "Outbound";
        this.option1 = StripType.INBOUND;
        this.option2 = StripType.OUTBOUND;
        break;
    }
    this.setCompactText()
  }


  setCompactText() {

    if (this.fs.compactMode) {
      this.compactIcon = "maximize-2"
      this.compactText = "Expand"
    } else {
      this.compactIcon = "minimize-2"
      this.compactText = "Compact"
    }
  }

  switchCompact() {
    this.fs.compactMode = !this.fs.compactMode;
  }
}
