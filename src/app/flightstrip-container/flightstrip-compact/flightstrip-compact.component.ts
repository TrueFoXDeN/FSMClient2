import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {Flightstrip, iconState, statusArrival, statusDeparture, statusVfr, stripType} from "../flightstrip.model";
import {FlightstripService} from "../flightstrip.service";
import {FlightStripCompact} from "../flightstrip-directives/flightStripCompact.directive";


@Component({
  selector: 'app-flightstrip-compact',
  templateUrl: './flightstrip-compact.component.html',
  styleUrls: ['./flightstrip-compact.component.scss', '../icon.scss']
})
export class FlightstripCompactComponent implements OnDestroy {
  @Input() fs!: Flightstrip;
  @ViewChild(FlightStripCompact) fsContainerDir: any;
  @ViewChild('menutrigger') menutrigger!: ElementRef;
  @Output("triggeredCompact") compactModeTrigger = new EventEmitter<void>()
  stripTypes = stripType
  iconStates = iconState
  highlightActive = false;
  status: any;
  isMouseMoving: boolean = false;
  isMouseDown: boolean = false;
  isTouchCanceled = false;
  isTouchEnded = false;
  isTouchMoved = false;
  inputsDisabled = false;
  subscriptionHandles: any = [];

  @Output("nextStatus") nextStatusEvent = new EventEmitter<void>()
  @Output("prevStatus") prevStatusEvent = new EventEmitter<void>()

  constructor(private fsService: FlightstripService) {
    this.subscriptionHandles.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.checkStatus();
        this.fs.status = 0;
      }
    }));

    this.subscriptionHandles.push(this.fsService.dragChange.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.inputsDisabled = data.dragEnabled;
      }
    }));

    this.subscriptionHandles.push(this.fsService.searchFlightstrip.subscribe(() => {
      if (this.fs.isMarkedBySearch) {
        this.highlightActive = true;
        this.fs.isMarkedBySearch = false;
        setTimeout(() => {
          this.highlightActive = false;
        }, 8000);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptionHandles.forEach((subscription: any) => {
      subscription.unsubscribe();
    })
  }

  ngOnInit() {
    switch (this.fs.type) {
      case stripType.OUTBOUND:
        this.status = statusDeparture
        break;
      case stripType.INBOUND:
        this.status = statusArrival
        break;
      case stripType.VFR:
        this.status = statusVfr
        break;
    }
  }

  trimRoute(route: string): string {
    if (route === undefined || route === null) {
      return "";
    }

    let waypoints = route.split(" ")
    let charCount = 0

    waypoints.forEach((x) => {
      charCount += x.length;
    })

    while (charCount > 25) {
      charCount -= waypoints[Math.floor(waypoints.length / 2)].length + 1

      let waypointsLeft = waypoints.slice(0, Math.floor(waypoints.length / 2))
      let waypointsRight = waypoints.slice(Math.floor(waypoints.length / 2 + 1), waypoints.length + 1)
      waypoints = waypointsLeft.concat(waypointsRight)
    }

    let waypointsLeft = waypoints.slice(0, Math.floor(waypoints.length / 2))
    let waypointsRight = waypoints.slice(Math.floor(waypoints.length / 2 + 1), waypoints.length + 1)

    waypoints = waypointsLeft.concat(["..."])
    waypoints = waypoints.concat(waypointsRight)

    return waypoints.join(" ")
  }

  onMouseDown() {
    this.isMouseDown = true
    setTimeout(() => {
      if (!this.isMouseMoving && this.isMouseDown) {
        this.fsService.dragFlightstrip.next(true);
      }
    }, this.fsService.dragDelay - 10);
    this.isMouseMoving = false;
  }

  onMouseUp() {
    this.isMouseDown = false;
    this.fsService.dragFlightstrip.next(false);
  }

  onContextOpened() {
    //this.fsContainerDir.markForDeleteOperation()
  }

  nextStatus() {
    this.nextStatusEvent.emit();
  }

  prevStatus() {
    this.prevStatusEvent.emit();
  }

  checkStatus() {
    switch (this.fs.type) {
      case stripType.OUTBOUND:
        this.status = statusDeparture
        break;
      case stripType.INBOUND:
        this.status = statusArrival
        break;
      case stripType.VFR:
        this.status = statusVfr
        break;
    }
  }


  onTouchStart() {
    this.isTouchEnded = false;
    this.isTouchCanceled = false;
    this.isTouchMoved = false;
    setTimeout(() => {
      if (!this.isTouchEnded && !this.isTouchCanceled && !this.isTouchMoved) {
        console.log("Clicked");
      }
    }, 1000);
  }

  onTouchMove() {
    this.isTouchMoved = true;
  }

  onTouchEnd() {
    this.isTouchEnded = true;
  }

  onDoubleClick() {
    this.compactModeTrigger.emit()
  }

  onSecondDoubleClick(event : any){
    event.stopPropagation()
  }



}
