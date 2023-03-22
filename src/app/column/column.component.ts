import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Flightstrip, stripType} from '../flightstrip-container/flightstrip/flightstrip.model';
import {ColumnModel} from "./column.model";
import {Data} from "../data";
import {Util} from "../util";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input("name") name = ""
  @Input("uuid") uuid = ""
  @Output() submittedValue = new EventEmitter<void>();
  public strips: Flightstrip[] = []

  constructor(public data: Data, private util: Util) {
  }


  addInboundFlightstrip() {
    let fs = new Flightstrip(this.util.generateUUID(), stripType.INBOUND, this.uuid);
    this.data.flightstripData?.[`${this.uuid}`]?.['flightstrips'].push(fs);
  }

  addOutboundFlightstrip() {
    let fs = new Flightstrip(this.util.generateUUID(), stripType.OUTBOUND, this.uuid);
    this.data.flightstripData?.[`${this.uuid}`]?.['flightstrips'].push(fs);
  }

  addVfrFlightstrip() {
    let fs = new Flightstrip(this.util.generateUUID(), stripType.VFR, this.uuid);
    this.data.flightstripData?.[`${this.uuid}`]?.['flightstrips'].push(fs);
  }

  generateRandomString() {
    return Math.random().toString(36).substring(2, 7);
  }


  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onKeyPress(event: any) {
    switch (event.key) {
      case "i":
        this.addInboundFlightstrip();
        break;
      case "o":
        this.addOutboundFlightstrip();
        break;
      case "v":
        this.addVfrFlightstrip();
        break;
    }
  }

  onMouseEnter(event: any) {
    event.target.focus()
  }

  onMouseLeave(_event: any) {
    this.submittedValue.emit();
  }

  onHeaderDoubleClick() {
    console.log("Double click")
  }

  getDragDelay() {
    return 10;
  }

  getWindowWidth() {
    return window.innerWidth;
  }
}
