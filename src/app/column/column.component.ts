import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild} from '@angular/core';
import {Flightstrip, StripType} from '../flightstrip-container/flightstrip.model';
import {Util} from "../util";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {FlightstripContainerComponent} from "../flightstrip-container/flightstrip-container.component";
import {DataService} from "../services/data.service";
import {ShortcutService} from "../services/shortcut.service";
import {MultiplayerSendService} from "../services/multiplayer-send.service";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent implements OnInit {
  @Input("name") name = ""
  @Input("uuid") uuid = ""
  @Output() blurEmitter = new EventEmitter<void>();
  @ViewChild(FlightstripContainerComponent) fsContainer!: QueryList<FlightstripContainerComponent>;
  public strips: Flightstrip[] = []
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;
  actionList: Map<string, Function> = new Map();
  subscriptionHandles: any = [];

  constructor(public dataService: DataService, private util: Util, private fsService: FlightstripService, private shortcutService: ShortcutService, private mpService: MultiplayerSendService) {
    this.subscriptionHandles.push(this.dataService.cancelFsDrag.subscribe((fsId) => {
      this.onMouseUp(fsId);
    }));
  }

  ngOnInit(): void {
    this.actionList.set("createVfr", () => this.addVfrFlightstrip());
    this.actionList.set("createOutbound", () => this.addOutboundFlightstrip());
    this.actionList.set("createInbound", () => this.addInboundFlightstrip());
    this.shortcutService.registerComponentActions(this.uuid, this.actionList)
  }


  addInboundFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', StripType.INBOUND);
  }

  addOutboundFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', StripType.OUTBOUND);
  }

  addVfrFlightstrip() {
    this.fsService.createFlightstrip(this.uuid, '', StripType.VFR);
  }


  drop(event: CdkDragDrop<[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.mpService.processMessage("move_flightstrip", {
        fsId: event.item.data.id,
        oldColumnId: this.uuid,
        newColumnId: this.uuid,
        newPos: event.currentIndex
      });
    } else {
      let prevColumnId = event.item.data.columnId;
      let newColumnId = this.uuid;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.mpService.processMessage("move_flightstrip", {
        fsId: event.item.data.id,
        oldColumnId: prevColumnId,
        newColumnId: newColumnId,
        newPos: event.currentIndex
      });
    }
    this.fsService.changedStripPos.next({id: event.item.data?.id, newPosistion: event.currentIndex})
  }

  onKeyPress(event: any) {
    if (!this.fsService.isInputFocused) {
      this.shortcutService.executeShortcut(this.uuid, event)
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

  dragExited() {
    console.log("dragExited");
  }

  dragEnded(fsId: string) {
    console.log("Drag ended");
    this.fsService.dragChange.next({id: fsId, dragEnabled: false})
    this.dataService.draggedFsID = ""
  }


  onMouseDown(fsId: string, event: any) {
    this.isMouseDown = true
    setTimeout(() => {
      if (event.button == 0 && this.isMouseDown && !this.isMouseMoving) {
        for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
          if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {

            this.fsService.dragChange.next({id: fsId, dragEnabled: true})
            this.dataService.draggedFsID = fsId;
            break;
          }
        }
      }
    }, this.fsService.dragDelay - 20);
    this.isMouseMoving = false;
  }

  onMouseUp(fsId: string) {
    console.log("On mouse up");
    this.isMouseDown = false;
    this.fsService.dragChange.next({id: fsId, dragEnabled: false})
    this.dataService.draggedFsID = ""
  }

  onMouseMove(fsId: string) {
    if (!this.isMouseMoving) {
      this.isMouseMoving = true
    }
  }

  dragStarted(fsId: string) {
    for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
      if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {

        this.fsService.dragChange.next({id: fsId, dragEnabled: true})
        this.dataService.draggedFsID = fsId;
        break;
      }
    }
  }
}


