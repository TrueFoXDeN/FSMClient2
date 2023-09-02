import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Data} from "../data";
import {StyleChangerService} from "../services/style-changer.service";
import {SnackbarMessageService} from "../services/snackbar-message.service";
import {ColumnBuilderService} from "../services/column-builder.service";
import {NetworkMenuComponent} from "../overlays/network-menu/network-menu.component";
import {NetworkService} from "../services/network.service";
import {ProfileSettingsComponent} from "../overlays/profile-settings/profile-settings.component";
import {ProximitySettingsComponent} from "../overlays/proximity-settings/proximity-settings.component";
import {MultiplayerSettingsComponent} from "../overlays/multiplayer-settings/multiplayer-settings.component";
import {SettingsComponent} from "../overlays/settings/settings.component";
import {HelpOverlayComponent} from "../overlays/help-overlay/help-overlay.component";
import {StatisticsOverlayComponent} from "../overlays/statistics-overlay/statistics-overlay.component";
import {Search} from "angular-feather/icons";
import {SearchCallsignComponent} from "../overlays/search-callsign/search-callsign.component";
import {Util} from "../util";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscriptionList: any = []
  networkIcon: string = "standard";

  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar, public dialog: MatDialog,
              private globalData: Data, private styleChanger: StyleChangerService, private snackService: SnackbarMessageService,
              private colBuilderService: ColumnBuilderService, public networkService: NetworkService,
              private columnBuilderService: ColumnBuilderService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.networkService.changedNetworkEmitter.subscribe((data) => {
      if (data.active) {
        this.networkIcon = "success";
      } else {
        this.networkIcon = "standard";
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  onZoomIn() {
    if (this.customStyle.multiplier < 2.2) {
      this.customStyle.multiplier += 0.15;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`, "standard")
      this.styleChanger.changedSize.next();
    }
  }

  onZoomOut() {
    if (this.customStyle.multiplier > 0.7) {
      this.customStyle.multiplier -= 0.15;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.customStyle.multiplier * 100)}%`, "standard")
      this.styleChanger.changedSize.next();
    }
  }


  ngOnInit(): void {
  }

  openColumnbuilder() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '80vh';
    dialogConfig.width = '80vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      columnData: JSON.parse(JSON.stringify(this.globalData.profileData[this.globalData.currentProfileID].columnStructure))
    }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        this.globalData.profileData[this.globalData.currentProfileID].columnStructure = data;
      }
      this.globalData.profileData[this.globalData.currentProfileID].columnStructure.forEach((column: any) => {
        if (this.globalData.flightstripData[column?.['uuid']] == null) {
          this.globalData.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
        }
      });
      this.colBuilderService.columnConfigChanged.next();
    });
  }

  openNetworkMenu() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '50vh';
    dialogConfig.width = '50vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(NetworkMenuComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
      }
    });
  }

  openProfileSettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(ProfileSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.columnBuilderService.columnConfigChanged.next()
      console.log(`Using profile "${this.globalData.currentProfile.name}"`)
    });
  }

  openProximitySettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${500 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${1200 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(ProximitySettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {


    });
  }

  openMultiplayerSettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${350 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(MultiplayerSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {


    });
  }


  openAppSettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${350 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(SettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {


    });
  }


  openHelpOverlay() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${350 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(HelpOverlayComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

  openStatsOverlay() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${350 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(StatisticsOverlayComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

  openSearchCallsign() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${150 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${300 * this.customStyle.multiplier}px`;
    const dialogRef = this.dialog.open(SearchCallsignComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.fsService.findFlightStrip(data);
    });
  }
}
