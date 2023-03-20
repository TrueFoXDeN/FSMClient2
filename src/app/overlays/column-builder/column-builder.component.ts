import {Component, OnInit, VERSION} from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterConfig,
  GridsterItem,
  GridType,
  PushDirections,
  Resizable,
} from "angular-gridster2";


interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}
@Component({
  selector: 'app-column-builder',
  templateUrl: './column-builder.component.html',
  styleUrls: ['./column-builder.component.scss']
})


export class ColumnBuilderComponent implements OnInit{
  name = "Angular " + VERSION.major;
  options: Safe;
  dashboard: Array<GridsterItem>;

  constructor() {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 5,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      minCols: 3,
      maxCols: 100,
      minRows: 18,
      maxRows: 18,
      maxItemCols: 1,
      minItemCols: 1,
      maxItemRows: 30,
      minItemRows: 4,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 4,
      defaultItemRows: 15,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
  }

    this.dashboard = [];
  }

  ngOnInit(): void {

    }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: GridsterItem): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 4 });
  }



}


