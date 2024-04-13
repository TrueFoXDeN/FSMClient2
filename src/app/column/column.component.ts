import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild
} from '@angular/core';
import {Flightstrip, StripType} from '../flightstrip-container/flightstrip.model';
import {Util} from "../util";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {FlightstripContainerComponent} from "../flightstrip-container/flightstrip-container.component";
import {DataService} from "../services/data.service";
import {ShortcutService} from "../services/shortcut.service";
import {MultiplayerSendService} from "../services/multiplayer-send.service";
import {ColumnService} from "./column.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})

export class ColumnComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input("name") name = ""
  @Input("uuid") uuid = ""
  @Output() blurEmitter = new EventEmitter<void>();
  @ViewChild(FlightstripContainerComponent) fsContainer!: QueryList<FlightstripContainerComponent>;
  @ViewChild(CdkDropList) dropList!: CdkDropList;
  public strips: Flightstrip[] = []
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;
  actionList: Map<string, Function> = new Map();
  subscriptions: Subscription[] = [];

  constructor(public dataService: DataService, private util: Util, private fsService: FlightstripService,
              private shortcutService: ShortcutService, private mpService: MultiplayerSendService,
              private changeDetector: ChangeDetectorRef, private columnService: ColumnService) {

  }

  ngOnInit(): void {
    this.actionList.set("createVfr", () => this.addVfrFlightstrip());
    this.actionList.set("createOutbound", () => this.addOutboundFlightstrip());
    this.actionList.set("createInbound", () => this.addInboundFlightstrip());
    this.shortcutService.registerComponentActions(this.uuid, this.actionList)
  }

  ngAfterViewInit() {
    this.subscriptions.push(this.columnService.changeDetection.subscribe({
      next: () => {
        this.changeDetector.detectChanges()
      }
    }))


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

  // moveItems(previousIndex: number, currentIndex: number){
  //   moveItemInArray(this.dropList.data, previousIndex, currentIndex);
  // }

//Emits when the user drops the item inside a container.
  drop(event: CdkDragDrop<[]>) {
    try {


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
        if (event.previousContainer.data[event.previousIndex]) {
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


      }
      this.fsService.changedStripPos.next({id: event.item.data?.id, newPosition: event.currentIndex})
    } catch (error) {
      this.fsService.dragActive.next({id: event.item.data.id, dragEnabled: false})
    }

  }

  onKeyPress(event: any) {
    if (!this.fsService.isInputFocused) {
      this.shortcutService.executeShortcut(this.uuid, event, 'column')
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

  //Emits when the user stops dragging an item in the container.
  dragEnded(fsId: string) {
    this.columnService.dragActive = false
    this.fsService.dragActive.next({id: fsId, dragEnabled: false})
  }


  onMouseDown(fsId: string, event: any) {
    this.isMouseDown = true
    setTimeout(() => {
      if (event.button == 0 && this.isMouseDown && !this.isMouseMoving) {
        for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
          if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {

            this.fsService.dragActive.next({id: fsId, dragEnabled: true})
            break;
          }
        }
      }
    }, this.fsService.dragDelay - 20);
    this.isMouseMoving = false;
  }

  onMouseUp(fsId: string) {
    this.isMouseDown = false;
    this.fsService.dragActive.next({id: fsId, dragEnabled: false})
  }

  onMouseMove(fsId: string) {
    if (!this.isMouseMoving) {
      this.isMouseMoving = true
    }
  }

  //Emits when the user starts dragging the item.

  dragStarted(fsId: string) {
    this.columnService.dragActive = true
    for (let i = 0; i < this.dataService.flightstripData?.[this.uuid].flightstrips.length; i++) {
      if (this.dataService.flightstripData[this.uuid].flightstrips[i].id == fsId && this.dataService.flightstripData[this.uuid].flightstrips[i].compactMode) {
        this.fsService.dragActive.next({id: fsId, dragEnabled: true})
        break;
      }
    }
  }

  onDragEntered() {
  }

  ngOnDestroy(): void {
    for (let i of this.subscriptions) {
      i.unsubscribe()
    }
  }
}


