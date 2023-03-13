import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Flightstrip, stripType} from '../flightstrip/flightstrip.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() tabIndex = 0
  @Output() submittedValue = new EventEmitter<void>();
  public strips: Flightstrip[] = []

  addInboundFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), stripType.INBOUND);
    this.strips.push(fs)
  }

  addOutboundFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), stripType.OUTBOUND);
    this.strips.push(fs)
  }

  addVfrFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), stripType.VFR);
    this.strips.push(fs)
  }

  generateRandomString() {
    return Math.random().toString(36).substring(2, 7);
  }


  drop(event: CdkDragDrop<Flightstrip[]>) {
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
    console.log(event)
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
    let screenWidth = window.innerWidth;
    if (screenWidth <= 1080) {
      return 100;
    } else {
      return 0;
    }
  }

  getWindowWidth() {
    return window.innerWidth;
  }
}
