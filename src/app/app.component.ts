import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Data} from "./data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'FlightStrip Manager';

  constructor(private cookieService: CookieService, private globalStorage: Data) {
    if (this.cookieService.check("currentProfileID")) {
      this.globalStorage.lastUsedProfileID = this.cookieService.get("currentProfileID");
    } else {
      this.globalStorage.lastUsedProfileID = this.globalStorage.getStandardProfileID();
    }
    this.globalStorage.currentProfileID = this.globalStorage.lastUsedProfileID;
    if (localStorage.getItem("profileStructure") != null) {
      this.globalStorage.profileData = JSON.parse(localStorage.getItem("profileStructure") || '{}')
    }
    this.globalStorage.profileData[this.globalStorage.getStandardProfileID()] = this.globalStorage.standardProfile

    console.log(`Current profile-ID: ${this.globalStorage.currentProfileID}`)
    console.log(`Current profile-Name: ${this.globalStorage.profileData[this.globalStorage.currentProfileID].name}`)
  }


  ngOnInit(): void {
  }
}
