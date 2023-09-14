import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {SnackbarMessageService} from "./services/snackbar-message.service";
import {DataService} from "./services/data.service";
import packageInfo from '../../package.json';
import {Title} from "@angular/platform-browser";
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ColumnBuilderComponent} from "./overlays/column-builder/column-builder.component";
import {CookieDialogComponent} from "./overlays/cookie-dialog/cookie-dialog.component";
import {LoggingService} from "./services/logging.service";
import {Util} from "./util";
import {SearchcallsignService} from "./services/searchcallsign.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FSM';
  version = packageInfo.version

  constructor(private cookieService: CookieService, private dataService: DataService,
              private messageService: SnackbarMessageService, private titleService: Title,
              public dialog: MatDialog, private loggingService: LoggingService, private util: Util,
              private searchcallsignService: SearchcallsignService) {
    this.titleService.setTitle(this.title + " v" + this.version);
    if (this.cookieService.check("currentProfileID")) {
      this.dataService.currentProfileID = this.cookieService.get("currentProfileID");
    } else {
      this.dataService.currentProfileID = this.dataService.getStandardProfileID();
    }
    if (localStorage.getItem("profileStructure") != null) {
      this.dataService.profileData = JSON.parse(localStorage.getItem("profileStructure") || '{}')
    }
    this.dataService.profileData[this.dataService.getStandardProfileID()] = this.dataService.standardProfile
    if (!this.dataService.profileData.hasOwnProperty(this.dataService.currentProfileID)) {
      this.dataService.currentProfileID = this.dataService.getStandardProfileID();
      this.messageService.showMessage("Error loading profile. Loading default. ", "error");
    } else {
      this.messageService.showMessage(`Profile "${this.dataService.profileData[this.dataService.currentProfileID].name}" loaded`, "standard");
    }
    if (!this.cookieService.check("cookieAccepted")) {
      this.openCookieDialog();
      this.cookieService.set("cookieAccepted", "true", {expires: 10000, sameSite: 'Lax'})
    }

    if (this.cookieService.check('uid')) {
      this.dataService.uid = this.cookieService.get('uid')
    } else {
      this.dataService.uid = this.util.generateUUID()
      this.cookieService.set('uid', this.dataService.uid)
    }

    this.loggingService.logActivity(this.dataService.uid)


    }


  openCookieDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.height = '30vh';
    dialogConfig.width = '25vw';
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const dialogRef = this.dialog.open(CookieDialogComponent, dialogConfig);

  }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  keyEvent(e: KeyboardEvent){
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
      e.preventDefault();
      this.searchcallsignService.openSearchCallsign()
    }
    if(e.key === 'Escape'){
      for(const [k, c] of Object.entries(this.dataService.flightstripData)){
        if(c && typeof c === 'object' && 'flightstrips' in c && Array.isArray(c.flightstrips)){
          for(let f of c.flightstrips){
            f.deleteActive = false
          }
        }

      }
    }
  }


}
