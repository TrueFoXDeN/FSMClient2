import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Data} from "../../data";
import {Flightstrip, stripType} from "../flightstrip.model";
import {FlightstripService} from "../flightstrip.service";
import {StyleChangerService} from "../../services/style-changer.service";

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

  constructor(private globalData: Data, private styleService: StyleChangerService, private fsService: FlightstripService) {

  }


  deleteStrip() {
    let index = this.globalData.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
    this.globalData.flightstripData[this.fs.columnId].flightstrips.splice(index, 1)
  }

  archiveStrip() {
    this.globalData.archivedStrips[this.fs.id] = this.fs
    this.deleteStrip();
  }

  switchToOption(optionNumber: number) {
    switch (optionNumber) {
      case 1:
        let index: number = 0
        index = this.globalData.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
        this.globalData.flightstripData[this.fs.columnId].flightstrips[index].type = this.option1
        this.fsService.changedType.next({type: this.option1, id: this.fs.id})
        break;
      case 2:
        let index2: number = 0;
        index2 = this.globalData.flightstripData[this.fs.columnId].flightstrips.indexOf(this.fs)
        this.globalData.flightstripData[this.fs.columnId].flightstrips[index2].type = this.option2
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
