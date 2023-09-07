import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {SnackbarMessageService} from "./services/snackbar-message.service";
import {DataService} from "./services/data.service";
import packageInfo from '../../package.json';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FSM';
  version = packageInfo.version
  constructor(private cookieService: CookieService, private dataService: DataService, private messageService: SnackbarMessageService, private titleService:Title) {
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
    console.log(`Current profile-ID: ${this.dataService.currentProfileID}`)
    console.log(`Current profile-Name: ${this.dataService.profileData[this.dataService.currentProfileID].name}`)
  }


  ngOnInit(): void {
  }
}
