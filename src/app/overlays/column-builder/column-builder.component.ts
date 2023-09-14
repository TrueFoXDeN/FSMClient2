import {Component, Inject, OnInit, VERSION} from '@angular/core';
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
import {Util} from "../../util";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material/dialog";
import {DataService} from "../../services/data.service";


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


export class ColumnBuilderComponent implements OnInit {
  name = "Angular " + VERSION.major;
  options: Safe;
  dashboard: Array<GridsterItem>;
  currentData: any

  constructor(private util: Util, public dialogRef: MatDialogRef<ColumnBuilderComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private dataService : DataService) {
    this.currentData = data
    this.dashboard = data.columnData;
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 5,
      outerMargin: true,
      outerMarginTop: 12,
      outerMarginRight: 12,
      outerMarginBottom: 12,
      outerMarginLeft: 12,
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
        handles: {
          s: true, e: false, n: true, w: false, se: true, ne: true, sw: true, nw: true
        }
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: true,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
    }
  }

  ngOnInit(): void {
    this.dashboard = this.currentData.columnData;
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

  addItem($event: MouseEvent | TouchEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    let uuid = this.util.generateUUID();
    this.dashboard = this.dashboard || [];
    this.dashboard.push({x: 0, y: 0, cols: 1, rows: 9, uuid: uuid, name: ""});
  }


  alignColumns(){
    this.options.compactType = CompactType.CompactLeft
    this.changedOptions()
    this.options.compactType = CompactType.None
    this.changedOptions()
  }
  saveAndClose() {
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure = this.dashboard
    // let data = {"columnData": this.dashboard}
    localStorage.setItem("profileStructure", JSON.stringify(this.dataService.profileData))
    this.dialogRef.close(this.dashboard)
  }

  closeWithoutSaving() {
    this.dialogRef.close()
  }

  saveConfig() {
    let data = {"columnData": this.dashboard}
    localStorage.setItem("columnConfig", JSON.stringify(data))
  }

  loadConfig() {
    if (typeof (localStorage.getItem("columnConfig")) != "undefined") {
      let data = JSON.parse(localStorage.getItem("columnConfig") || '{}')
      this.dashboard = data.columnData
    }
  }


}


