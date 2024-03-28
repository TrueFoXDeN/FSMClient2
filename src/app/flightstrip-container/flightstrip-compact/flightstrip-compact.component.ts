import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, TemplateRef, ViewChild} from '@angular/core';
import {
  Flightstrip,
  TriangleIconState,
  StatusArrival,
  StatusDeparture,
  StatusVfr,
  StripType,
  CommunicationIconState
} from "../flightstrip.model";
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
  //@ViewChild('menutrigger') menutrigger!: ElementRef;
  @Output("triggeredCompact") compactModeTrigger = new EventEmitter<void>()
  stripTypes = StripType
  triangleIconStates = TriangleIconState
  communicationIconStates = CommunicationIconState
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
      case StripType.OUTBOUND:
        this.status = StatusDeparture
        break;
      case StripType.INBOUND:
        this.status = StatusArrival
        break;
      case StripType.VFR:
        this.status = StatusVfr
        break;
    }
  }

  trimRoute(input: string): string {
    const maxLength = 54; // 2 Zeilen mit je 27 Zeichen
    const ellipsis = '...';

    if (input.length <= maxLength) {
      return input; // Wenn der Eingabestring bereits passt, gib ihn unverändert zurück.
    }

    // Teile den Eingabestring in zwei Hälften.
    const middle = Math.floor(input.length / 2);

    // Finde das letzte Leerzeichen vor oder nach der Mitte, um ein ganzes Wort zu entfernen.
    let startIndex = middle;
    while (startIndex < input.length && input[startIndex] !== ' ') {
      startIndex++;
    }

    let endIndex = middle;
    while (endIndex >= 0 && input[endIndex] !== ' ') {
      endIndex--;
    }

    // Falls kein Leerzeichen gefunden wurde, schneide einfach den String ab.
    if (startIndex >= input.length && endIndex < 0) {
      return input.substring(0, maxLength - ellipsis.length) + ellipsis;
    }

    // Schneide den String und füge "..." in die Mitte ein.
    const trimmedString = input.substring(0, endIndex) + ellipsis + input.substring(startIndex);

    // Stelle sicher, dass die Länge des gekürzten Strings nicht mehr als maxLength beträgt.
    if (trimmedString.length > maxLength) {
      return this.trimRoute(trimmedString); // Rekursion, um sicherzustellen, dass die Länge passt.
    }

    return trimmedString;
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
      case StripType.OUTBOUND:
        this.status = StatusDeparture
        break;
      case StripType.INBOUND:
        this.status = StatusArrival
        break;
      case StripType.VFR:
        this.status = StatusVfr
        break;
    }
  }


  onTouchStart() {
    this.isTouchEnded = false;
    this.isTouchCanceled = false;
    this.isTouchMoved = false;
    setTimeout(() => {
      if (!this.isTouchEnded && !this.isTouchCanceled && !this.isTouchMoved) {

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


  protected readonly communicationIconState = CommunicationIconState;
}
