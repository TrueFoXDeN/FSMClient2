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

interface ColumnOccurrences {
  id: string,
  occurrence: number
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
  columnStructureBackup: any;
  currentData: any

  constructor(private util: Util, public dialogRef: MatDialogRef<ColumnBuilderComponent>,
              @Inject(MAT_DIALOG_DATA) data: any, private dataService: DataService) {
    this.currentData = data
    this.columnStructureBackup = JSON.parse(JSON.stringify(data.columnData))
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


  alignColumns() {
    this.options.compactType = CompactType.CompactLeft
    this.changedOptions()
    this.options.compactType = CompactType.None
    this.changedOptions()
  }

  saveAndClose() {

    let mergedData = this.mergeColumnData(this.dataService.profileData[this.dataService.currentProfileID].columnStructure, this.columnStructureBackup, this.dashboard);
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure = mergedData
    // let data = {"columnData": this.dashboard}
    localStorage.setItem("profileStructure", JSON.stringify(this.dataService.profileData))

    this.dialogRef.close(mergedData)
  }

  mergeColumnData(actualColumnData: any, columnDataAtBuilderInit: any, columnBuilderDataAtSave: any) {
    const columnIdSet = new Set<string>();
    //Add all uuids to a set to get all uuids present in all versions

    columnDataAtBuilderInit.forEach((value: any) => {
      columnIdSet.add(value.uuid);
    });
    columnBuilderDataAtSave.forEach((value: any) => {
      columnIdSet.add(value.uuid);
    });
    actualColumnData.forEach((value: any) => {
      columnIdSet.add(value.uuid);
    });

    //Create columnOccurrencesArray with occurrences of ColID in each dataset
    // Encoding each occurrence as a binary number (1: exists at Init, 2: exists on save, 4: exists in actual dataset)
    let columnOccurrencesArray: ColumnOccurrences[] = []
    columnIdSet.forEach((colID: string) => {
      let colOccurrence: ColumnOccurrences = {id: colID, occurrence: 0};
      colOccurrence.occurrence += columnDataAtBuilderInit.forEach((colObject: any) => {
        return colObject.uuid == colID;
      }) ? 1 : 0;

      for (let colObject of columnDataAtBuilderInit) {
        if (colObject.uuid === colID) {
          colOccurrence.occurrence += 1;
          break;
        }
      }

      for (let colObject of columnBuilderDataAtSave) {
        if (colObject.uuid === colID) {
          colOccurrence.occurrence += 2;
          break;
        }
      }

      for (let colObject of actualColumnData) {
        if (colObject.uuid === colID) {
          colOccurrence.occurrence += 4;
          break;
        }
      }
      columnOccurrencesArray.push(colOccurrence);
    });
    for (let colOccurrence of columnOccurrencesArray) {
      //Delete column from builderSave array which was deleted remotely
      if (colOccurrence.occurrence === 3) {
        let indexofDeletedCol = -1;
        for (let i = 0; i < columnBuilderDataAtSave.length; i++) {
          if (columnBuilderDataAtSave[i].uuid === colOccurrence.id) {
            indexofDeletedCol = i;
            break;
          }
        }
        if (indexofDeletedCol != -1) {
          columnBuilderDataAtSave.splice(indexofDeletedCol, 1);
        }
      }
      //Add column to builderSave array which was added remotely
      else if (colOccurrence.occurrence === 4) {
        let newColID = "";
        let newColName = ""
        let maxXIndex = -1;
        for (let i = 0; i < columnBuilderDataAtSave.length; i++) {
          if (columnBuilderDataAtSave[i].x > maxXIndex) {
            maxXIndex = columnBuilderDataAtSave[i].x;
          }
        }
        for (let i = 0; i < actualColumnData.length; i++) {
          if (actualColumnData[i].uuid === colOccurrence.id) {
            newColID = actualColumnData[i].uuid;
            newColName = actualColumnData[i].name;
            break;
          }
        }
        columnBuilderDataAtSave.push({
          x: maxXIndex + 1,
          y: 0,
          cols: 1,
          rows: 18,
          name: newColName,
          uuid: newColID
        });
      }
    }
    return columnBuilderDataAtSave;
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


