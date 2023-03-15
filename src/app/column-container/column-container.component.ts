import {Component} from '@angular/core';
import {ColumnModel} from "../column/column.model";

@Component({
  selector: 'app-column-container',
  templateUrl: './column-container.component.html',
  styleUrls: ['./column-container.component.scss']
})
export class ColumnContainerComponent {
  columns: ColumnModel[] = []

  constructor() {

  }
}
