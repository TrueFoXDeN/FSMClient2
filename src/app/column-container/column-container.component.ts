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
    let model: ColumnModel = new ColumnModel("Ground", [0, 0], "60%")
    let model1: ColumnModel = new ColumnModel("Tower", [0, 0], "40%")
    this.columns.push(model)
    this.columns.push(model1)
  }
}
