import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, Output, QueryList, ViewChild} from '@angular/core';
import {Flightstrip, stripType} from '../flightstrip-container/flightstrip.model';
import {Util} from "../util";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {FlightstripContainerComponent} from "../flightstrip-container/flightstrip-container.component";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input("name") name = ""
  @Input("uuid") uuid = ""
  @Output() blurEmitter = new EventEmitter<void>();
  @ViewChild(FlightstripContainerComponent) fsContainer!: QueryList<FlightstripContainerComponent>;
  public strips: Flightstrip[] = []
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;

  constructor(public dataService: DataService, private util: Util, private fsService: FlightstripService) {
  }


  addInboundFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', stripType.INBOUND)
  }

  addOutboundFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', stripType.OUTBOUND)
  }

  addVfrFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', stripType.VFR)
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
    this.fsService.changedStripPos.next({id: event.item.data?.id, newPosistion: event.currentIndex})
  }

  onKeyPress(event: any) {
    switch (event.key) {
      case "i":
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
    this.blurEmitter.emit();
  }

  getDragDelay() {
    return this.fsService.dragDelay;
  }

  dragEnded(fsId: string) {
    this.fsService.dragChange.next({id: fsId, dragEnabled: false})
  }


  onMouseDown(fsId: string, event: any) {
    this.isMouseDown = true
    setTimeout(() => {
      if (event.button == 0 && this.isMouseDown && !this.isMouseMoving) {
        for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
          if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {

            this.fsService.dragChange.next({id: fsId, dragEnabled: true})
            break;
          }
        }
      }
    }, this.fsService.dragDelay - 20);
    this.isMouseMoving = false;
  }

  onMouseUp(fsId: string) {
    this.isMouseDown = false;
    this.fsService.dragChange.next({id: fsId, dragEnabled: false})
  }

  onMouseMove(fsId: string) {
    if (!this.isMouseMoving) {
      this.isMouseMoving = true
    }
  }

  dragStarted(fsId :string){
    for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
      if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {

        this.fsService.dragChange.next({id: fsId, dragEnabled: true})
        break;
      }
    }
  }
}


