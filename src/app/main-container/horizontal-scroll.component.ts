import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent {
  idTracker = 0;

  getId() {
    this.idTracker += 1;
    return this.idTracker;
  }
}
