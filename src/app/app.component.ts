import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Data} from "./data";
import {SnackbarMessageService} from "./services/snackbar-message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FlightStrip Manager';

  constructor(private cookieService: CookieService, private globalStorage: Data, private messageService: SnackbarMessageService) {
    if (this.cookieService.check("currentProfileID")) {
      this.globalStorage.currentProfileID = this.cookieService.get("currentProfileID");
    } else {
      this.globalStorage.currentProfileID = this.globalStorage.getStandardProfileID();
    }
    if (localStorage.getItem("profileStructure") != null) {
      this.globalStorage.profileData = JSON.parse(localStorage.getItem("profileStructure") || '{}')
    }
    this.globalStorage.profileData[this.globalStorage.getStandardProfileID()] = this.globalStorage.standardProfile
    if (!this.globalStorage.profileData.hasOwnProperty(this.globalStorage.currentProfileID)) {
      this.globalStorage.currentProfileID = this.globalStorage.getStandardProfileID();
      this.messageService.showMessage("Error loading profile. Loading default. ", "error");
    } else {
      this.messageService.showMessage(`Profile "${this.globalStorage.profileData[this.globalStorage.currentProfileID].name}" loaded`, "standard");
    }
    console.log(`Current profile-ID: ${this.globalStorage.currentProfileID}`)
    console.log(`Current profile-Name: ${this.globalStorage.profileData[this.globalStorage.currentProfileID].name}`)
  }


  ngOnInit(): void {
  }
}
