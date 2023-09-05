import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Airport} from "../proximity.model";

@Component({
  selector: 'app-proximity-row',
  templateUrl: './proximity-row.component.html',
  styleUrls: ['./proximity-row.component.scss']
})
export class ProximityRowComponent {
  @Input ("airport") airport: Airport
  @Input("columns") columns: string[] = [];
  @Output("delete") deleteEvent = new EventEmitter<void>()

  constructor() {
    this.airport = new Airport()
  }

  deleteRow() {
    this.deleteEvent.emit();
  }
}
