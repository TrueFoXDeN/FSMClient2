import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {StyleChangerService} from "../services/style-changer.service";
import {ColumnBuilderService} from "../services/column-builder.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {SearchCallsignComponent} from "../overlays/search-callsign/search-callsign.component";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";

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


export class HorizontalScrollComponent implements OnInit, OnDestroy {
  options: Safe;
  dashboard: Array<GridsterItem>;
  subscriptionList: any = []

  constructor(private globalData: Data, private styles: CustomStyles, private styleChanger: StyleChangerService, private columnBuilderService: ColumnBuilderService,
              public dialog: MatDialog, private fsService: FlightstripService) {
    this.subscriptionList.push(columnBuilderService.columnConfigChanged.subscribe(() => {
      this.columnConfigChanged();
    }));
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
      fixedColWidth: 450 * this.styles.multiplier,
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
    this.dashboard = this.globalData.profileData[this.globalData.currentProfileID].columnStructure;
    this.styleChanger.changedSize.subscribe(() => {
      this.changeColumnWidth();
    });
  }


  loadConfig() {
    this.dashboard = this.globalData.profileData[this.globalData.currentProfileID].columnStructure;
    this.globalData.profileData[this.globalData.currentProfileID].columnStructure.forEach((column: any) => {
      if (this.globalData.flightstripData[column?.['uuid']] == null) {
        this.globalData.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
      }
    });
  }

  ngOnInit(): void {
    this.loadConfig()
    console.log(environment.appVersion)
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  columnConfigChanged() {
    this.loadConfig()
  }

  changeColumnWidth() {
    this.dashboard = this.globalData.profileData[this.globalData.currentProfileID].columnStructure;
    this.options = {
      ...this.options,
      fixedColWidth: 450 * this.styles.multiplier
    }
  }

  openSearchWindow(event: KeyboardEvent) {
    if (event.key == "s") {
      if (!this.fsService.isInputFocused) {
        const dialogConfig = new MatDialogConfig()
        dialogConfig.height = `${150 * this.styles.multiplier}px`;
        dialogConfig.width = `${300 * this.styles.multiplier}px`;
        const dialogRef = this.dialog.open(SearchCallsignComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
          this.fsService.findFlightStrip(data);
        });
      }
    }
  }


}
