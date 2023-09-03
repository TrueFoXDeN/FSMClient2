import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, Output, QueryList, ViewChild} from '@angular/core';
import {Flightstrip, stripType} from '../flightstrip-container/flightstrip.model';
import {Data} from "../data";
import {Util} from "../util";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {FlightstripContainerComponent} from "../flightstrip-container/flightstrip-container.component";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input("name") name = ""
  @Input("uuid") uuid = ""
  @Output() submittedValue = new EventEmitter<void>();
  @ViewChild(FlightstripContainerComponent) fsContainer!: QueryList<FlightstripContainerComponent>;
  public strips: Flightstrip[] = []
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;
  isDragable = false;

  constructor(public data: Data, private util: Util, private fsService: FlightstripService) {
  }


  addInboundFlightstrip() {
    let nextPos = this.data.flightstripData?.[this.uuid]?.['flightstrips'].length
    console.log(nextPos)
    let fs = new Flightstrip(this.util.generateUUID(), stripType.INBOUND, this.uuid, nextPos);
    this.data.flightstripData?.[this.uuid]?.['flightstrips'].push(fs);
  }

  addOutboundFlightstrip() {
    let nextPos = this.data.flightstripData?.[this.uuid]?.['flightstrips'].length
    let fs = new Flightstrip(this.util.generateUUID(), stripType.OUTBOUND, this.uuid, nextPos);
    this.data.flightstripData?.[this.uuid]?.['flightstrips'].push(fs);
  }

  addVfrFlightstrip() {
    let nextPos = this.data.flightstripData?.[this.uuid]?.['flightstrips'].length
    let fs = new Flightstrip(this.util.generateUUID(), stripType.VFR, this.uuid, nextPos);
    this.data.flightstripData?.[this.uuid]?.['flightstrips'].push(fs);
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
    //this.fsService.changedStripPos.next()
    // console.log(`From ${event.previousContainer.id}\.${event.previousIndex} To ${event.container.id}\.${event.currentIndex}`)
    this.fsService.changedStripPos.next({id: event.item.data?.id, newPosistion: event.currentIndex})
  }

  onKeyPress(event: any) {
    switch (event.key) {
      case "i":
        console.log(this.fsService.isInputFocused)
        if (!this.fsService.isInputFocused) {
          this.addInboundFlightstrip();
        }
        break;
      case "o":
        if (!this.fsService.isInputFocused) {
          this.addOutboundFlightstrip();
        }
        break;
      case "v":
        if (!this.fsService.isInputFocused) {
          this.addVfrFlightstrip();
        }
        break;
    }
  }

  onMouseEnter(event: any) {
    event.target.focus()
  }

  onMouseLeave(_event: any) {
    this.submittedValue.emit();
  }

  getDragDelay() {
    return this.fsService.dragDelay;
  }

  dragEnded(fsId: string) {
    this.isDragable = false;
    this.fsService.dragChange.next({id: fsId, dragEnabled : false})
  }

  onMouseDown(fsId: string, event : any) {
    this.isMouseDown = true
    setTimeout(() => {
      if(event.button == 0){
        if (!this.isMouseMoving && this.isMouseDown) {
          this.fsService.dragChange.next({id: fsId, dragEnabled : true})
          this.isDragable = true;
        }
      }
    }, this.fsService.dragDelay - 20);
    this.isMouseMoving = false;
  }

  onMouseUp(fsId: string) {
    this.isMouseDown = false;
    this.isDragable = false;
    this.fsService.dragChange.next({id: fsId, dragEnabled : false})

  }

  onMouseMove(fsId: string) {
    if (!this.isMouseMoving) {
      this.isMouseMoving = true
    }
  }
}
