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
import {SidebarButton} from "./sidebar-directives/sidebarButton.directive";
import {ProfileSettingsComponent} from "../overlays/profile-settings/profile-settings.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscriptionList: any = []
  networkIcon: string = "standard";
  @ViewChild(SidebarButton) sidebarButtonDir: any;

  constructor(private customStyle: CustomStyles, private _snackBar: MatSnackBar, public dialog: MatDialog,
              private globalData: Data, private styleChanger: StyleChangerService, private snackService: SnackbarMessageService,
              private colBuilderService: ColumnBuilderService, private networkService: NetworkService) {
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

  searchCallsign() {
    console.log(this.globalData.flightstripData)
  }

  ngOnInit(): void {
  }

  openColumnbuilder() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '80vh';
    dialogConfig.width = '80vw';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = {
      columnData: JSON.parse(JSON.stringify(this.globalData.columnStructure))
    }
    const dialogRef = this.dialog.open(ColumnBuilderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
        this.globalData.columnStructure = data;
      }
      this.globalData.columnStructure.forEach((column) => {
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

  openProfileSettings(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = `${300 * this.customStyle.multiplier}px`;
    dialogConfig.width = `${300 * this.customStyle.multiplier}px`;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(ProfileSettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data != null) {
      }
    });
}


}
