import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
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
import {StyleChangerService} from "./services/style-changer.service";
import {ShortcutService} from "./services/shortcut.service";
import {MultiplayerReceiveService} from "./services/multiplayer-receive.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FSM';
  version = packageInfo.version
  actionsmap: Map<string, Function> = new Map();

  constructor(private cookieService: CookieService, private dataService: DataService,
              private messageService: SnackbarMessageService, private titleService: Title,
              public dialog: MatDialog, private loggingService: LoggingService, private util: Util,
              private searchcallsignService: SearchcallsignService, private styleChanger: StyleChangerService,
              private shortcutService: ShortcutService,
              private multiplayerReceiveService: MultiplayerReceiveService) {

    this.titleService.setTitle(this.title + " v" + this.version);
    this.actionsmap.set("openSearchCallsign", () => this.searchcallsignService.openSearchCallsign())
    this.actionsmap.set("abortDeletion", () => this.abortDeletion())
    shortcutService.registerComponentActions("app", this.actionsmap)

    this.loadProfileStructure();
    this.checkCookieService()

    this.loggingService.logActivity(this.dataService.uid)
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = "...";
  }

  ngOnDestroy(): void {
    this.shortcutService.removeComponentActions("app")
  }

  loadProfileStructure() {
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
      this.messageService.showMessage(`Profile "${this.dataService.profileData[this.dataService.currentProfileID].name}" loaded`, "info");
    }
  }

  checkCookieService() {
    if (!this.cookieService.check("cookieAccepted")) {
      this.openCookieDialog();
      this.cookieService.set("cookieAccepted", "true", {expires: 10000, sameSite: 'Lax'})
    }
    if (this.cookieService.check("zoomLevel")) {
      try {
        this.styleChanger.multiplier = parseFloat(this.cookieService.get('zoomLevel'))
        this.styleChanger.changedSize.next()
        this.messageService.showMessage(`Zoom set to ${Math.round(this.styleChanger.multiplier * 100)}%`, "info")
      } catch (e) {
        this.styleChanger.multiplier = 1.0
      }
    }
    if (this.cookieService.check('uid')) {
      this.dataService.uid = this.cookieService.get('uid')
    } else {
      this.dataService.uid = this.util.generateUUID()
      this.cookieService.set('uid', this.dataService.uid)
    }
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
  keyEvent(e: KeyboardEvent) {
    this.shortcutService.executeShortcut("app", e);
  }

  abortDeletion() {
    for (const [k, c] of Object.entries(this.dataService.flightstripData)) {
      if (c && typeof c === 'object' && 'flightstrips' in c && Array.isArray(c.flightstrips)) {
        for (let f of c.flightstrips) {
          f.deleteActive = false
        }
      }
    }
  }
}
