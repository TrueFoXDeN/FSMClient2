import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomStyles} from "../customStyles";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ColumnBuilderComponent} from "../overlays/column-builder/column-builder.component";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

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
import {DataService} from "../services/data.service";
import {SearchcallsignService} from "../services/searchcallsign.service";
import {ProximityService} from "../overlays/proximity-settings/proximity.service";
import {MultiplayerService} from "../services/multiplayer.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscriptionList: any = []
  networkIcon: string = "standard";
  radarIcon: string = "radar";

  constructor( private _snackBar: MatSnackBar, public dialog: MatDialog,
              private dataService: DataService, private styleChanger: StyleChangerService, private snackService: SnackbarMessageService,
              private colBuilderService: ColumnBuilderService, public networkService: NetworkService,
              private columnBuilderService: ColumnBuilderService, private searchcallsignService: SearchcallsignService,
              private multiplayerService: MultiplayerService,
              private proximityService: ProximityService, private cookieService: CookieService) {

    this.subscriptionList.push(this.networkService.changedNetworkEmitter.subscribe((data) => {
      if (data.active) {
        this.networkIcon = "success";
        if(this.proximityService.getActiveAirports().length > 0){
          this.radarIcon = "radar_success";
        }
      } else {
        this.networkIcon = "standard";
        this.radarIcon = "radar";
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  onZoomIn() {
    if (this.styleChanger.multiplier < 2.2) {
      this.styleChanger.multiplier += 0.10;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.styleChanger.multiplier * 100)}%`, "info")
      this.styleChanger.changedSize.next();
      this.cookieService.set("zoomLevel", this.styleChanger.multiplier.toString(), {expires: 10000, sameSite: 'Lax'})
    }
  }

  onZoomOut() {
    if (this.styleChanger.multiplier > 0.7) {
      this.styleChanger.multiplier -= 0.10;
      this.snackService.showMessage(`Zoom set to ${Math.round(this.styleChanger.multiplier * 100)}%`, "info")
      this.styleChanger.changedSize.next();
      this.cookieService.set("zoomLevel", this.styleChanger.multiplier.toString(), {expires: 10000, sameSite: 'Lax'})
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
      columnData: JSON.parse(JSON.stringify(this.dataService.profileData[this.dataService.currentProfileID].columnStructure))
    }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        //this.dataService.profileData[this.dataService.currentProfileID].columnStructure = data;
      }
      this.dataService.profileData[this.dataService.currentProfileID].columnStructure.forEach((column: any) => {
        if (this.dataService.flightstripData[column?.['uuid']] == null) {
          this.dataService.flightstripData[column?.['uuid']] = {name: column?.['name'], flightstrips: []}
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
    dialogConfig.height = `${350 * this.styleChanger.multiplier}px`;
    dialogConfig.width = `${350 * this.styleChanger.multiplier}px`;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(ProfileSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      this.columnBuilderService.columnConfigChanged.next()
    });
  }

  openProximitySettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `80vh`;
    dialogConfig.width = `80vw`;
    const dialogRef = this.dialog.open(ProximitySettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if(this.proximityService.getActiveAirports().length > 0 && this.networkService.getIsNetworkFetchActive()){
        this.radarIcon = "radar_success"
      }else{
        this.radarIcon = "radar"
      }
    });
  }

  openMultiplayerSettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `60vh`;
    dialogConfig.width = `45vw`;
    const dialogRef = this.dialog.open(MultiplayerSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {


    });
    // this.multiplayerService.connect()

  }


  openAppSettings() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${600 * this.styleChanger.multiplier}px`;
    dialogConfig.width = `${1050 * this.styleChanger.multiplier}px`;
    dialogConfig.autoFocus = false;
    const dialogRef = this.dialog.open(SettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
    });
  }


  openHelpOverlay() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.styleChanger.multiplier}px`;
    dialogConfig.width = `${350 * this.styleChanger.multiplier}px`;
    const dialogRef = this.dialog.open(HelpOverlayComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

  openStatsOverlay() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${350 * this.styleChanger.multiplier}px`;
    dialogConfig.width = `${350 * this.styleChanger.multiplier}px`;
    const dialogRef = this.dialog.open(StatisticsOverlayComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {

    });
  }

  openSearchCallsign() {
    this.searchcallsignService.openSearchCallsign()
  }
}
