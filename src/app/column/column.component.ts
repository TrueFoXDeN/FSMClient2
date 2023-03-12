import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Flightstrip } from '../flightstrip/flightstrip.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @Input() tabIndex = 0
  public strips: Flightstrip[] = []

  addInboundFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), "inbound");
    this.strips.push(fs)
  }
  addOutboundFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), "outbound");
    this.strips.push(fs)
  }
  addVfrFlightstrip() {
    let fs = new Flightstrip(this.generateRandomString(), "vfr");
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
    console.log(event)
    event.target.focus()
    console.log("Entered Column " + this.tabIndex)
  }

  onMouseLeave(event: any) {
    console.log("Left Column " + this.tabIndex)
  }
}
