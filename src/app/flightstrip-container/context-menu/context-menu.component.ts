import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Data} from "../../data";
import {Flightstrip, stripType} from "../flightstrip.model";
import {FlightstripService} from "../flightstrip.service";
import {StyleChangerService} from "../../services/style-changer.service";
import {DataService} from "../../services/data.service";
import {ProximityService} from "../../overlays/proximity-settings/proximity.service";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {
  @Input("fs") fs!: Flightstrip
  switchOption1: string = ""
  switchOption2: string = ""

  option1: stripType = stripType.INBOUND
  option2: stripType = stripType.INBOUND

  constructor(private dataService: DataService, private proximityService: ProximityService, private styleService: StyleChangerService, private fsService: FlightstripService) {

  }

  finishStrip() {
    this.proximityService.finishedAircrafts.push(this.fs.callsign)
    let index = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
    this.dataService.flightstripData[this.fs.columnId].flightstrips.splice(index, 1)
  }

  deleteStrip() {
    let index = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
    this.dataService.flightstripData[this.fs.columnId].flightstrips.splice(index, 1)
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
        this.fsService.changedType.next({type: this.option1, id: this.fs.id})
        break;
      case 2:
        let index2: number = 0;
        index2 = this.dataService.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
        this.dataService.flightstripData[this.fs.columnId].flightstrips[index2].type = this.option2
        this.fsService.changedType.next({type: this.option2, id: this.fs.id})
        break;
    }
  }

  ngOnInit(): void {
    switch (this.fs.type) {
      case stripType.INBOUND:
        this.switchOption1 = "Outbound";
        this.switchOption2 = "VFR"
        this.option1 = stripType.OUTBOUND;
        this.option2 = stripType.VFR;
        break;
      case stripType.OUTBOUND:
        this.switchOption1 = "Inbound";
        this.switchOption2 = "VFR"
        this.option1 = stripType.INBOUND;
        this.option2 = stripType.VFR;
        break;
      case stripType.VFR:
        this.switchOption1 = "Inbound";
        this.switchOption2 = "Outbound";
        this.option1 = stripType.INBOUND;
        this.option2 = stripType.OUTBOUND;
        break;
    }
  }


}
