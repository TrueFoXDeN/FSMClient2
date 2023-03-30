import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from "../flightstrip.model";
import {FlightstripService} from "../flightstrip.service";
import {FlightStripContainer} from "../flightstrip-directives/flightStrip.directive";
import {FlightStripCompact} from "../flightstrip-directives/flightStripCompact.directive";
import {FlightstripCompactBorderDirective} from "../flightstrip-directives/flightstrip-compact-border.directive";


@Component({
  selector: 'app-flightstrip-compact',
  templateUrl: './flightstrip-compact.component.html',
  styleUrls: ['./flightstrip-compact.component.scss']
})
export class FlightstripCompactComponent implements OnDestroy {
  @Input() fs!: Flightstrip;
  @ViewChild(FlightStripCompact) fsContainerDir: any;
  @ViewChild(FlightstripCompactBorderDirective) fsCompactBorder: any;
  @ViewChild('menutrigger') menutrigger!: ElementRef;
  @Output("triggeredCompact") compactModeTrigger = new EventEmitter<void>()
  status: any;
  stripType = stripType;
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
    this.subscriptionHandles.push(this.fsService.dragChange.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.inputsDisabled = data.dragEnabled;
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
    this.fsContainerDir.markForDeleteOperation()
  }

  onContextClosed() {
    this.fsCompactBorder.updateStyle();
  }

  nextStatus() {
    this.nextStatusEvent.emit();
  }

  prevStatus() {
    this.prevStatusEvent.emit();
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
