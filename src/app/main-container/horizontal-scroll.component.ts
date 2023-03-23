import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {environment} from "../../environments/environment";
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
import {Data} from "../data";
import {CustomStyles} from "../customStyles";

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})


export class HorizontalScrollComponent implements OnInit, OnChanges, DoCheck {
  options: Safe;
  dashboard: Array<GridsterItem>;

  constructor(private globalData: Data, private styles: CustomStyles) {
    this.options = {
      gridType: GridType.HorizontalFixed,
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
      minCols: 1,
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
      fixedColWidth: 400 * this.styles.multiplier,
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
        enabled: false,
      },
      resizable: {
        enabled: true,
        handles: {
          s: true, e: false, n: true, w: false, se: true, ne: true, sw: true, nw: true

        },
      },
      swap: false,
      pushItems: false,
      disablePushOnDrag: true,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
    }
    this.loadConfig()
    this.dashboard = this.globalData.columnStructure;
  }


  loadConfig() {
    if (localStorage.getItem("columnConfig") !== null) {
      let data = JSON.parse(localStorage.getItem("columnConfig") || '{}')
      this.globalData.columnStructure = data.columnData

    } else {
      this.globalData.columnStructure = []
    }
    this.dashboard = this.globalData.columnStructure;
    this.globalData.columnStructure.forEach((column) => {
      if (this.globalData.flightstripData[column?.['uuid']] == null) {
        console.log(`Neue Column: ${column?.['name']}`)
        this.globalData.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
      }
    });
  }

  ngOnInit(): void {
    this.loadConfig()
    console.log(this.globalData.columnStructure)
    console.log(environment.appVersion)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngDoCheck(): void {
    this.dashboard = this.globalData.columnStructure;
    // console.log("Called")
    this.options = {
      ...this.options,
      fixedColWidth: 400 * this.styles.multiplier
    }
  }
}
