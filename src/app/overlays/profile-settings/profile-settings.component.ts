import {Component, OnInit} from '@angular/core';
import {Util} from "../../util";
import {Data} from "../../data";
import {CookieService} from "ngx-cookie-service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarMessageService} from "../../services/snackbar-message.service";
import {ColumnBuilderService} from "../../services/column-builder.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})

export class ProfileSettingsComponent implements OnInit {
  profiles: any = []
  selectedProfile: any = {}
  deleteButtonActive = false;
  newProfileName = ""
  markForDelete = false;
  saveButtonActive = false;

  constructor(private util: Util, private dataService: DataService, private cookieService: CookieService,
              public dialogRef: MatDialogRef<ProfileSettingsComponent>, private snackService: SnackbarMessageService,
              private columnBuilderService: ColumnBuilderService) {
    const obj: any = this.dataService.profileData;
    Object.keys(obj).forEach((id: string) => {
      this.profiles.push({id: id, name: obj[id].name})
    });
  }

  onItemselect(event: any) {
    // console.log(event)
    let option = event.value
    if (option.id != this.dataService.getStandardProfileID()) {
      this.deleteButtonActive = true;
    } else {
      this.deleteButtonActive = false;
    }
  }

  saveProfile() {
    if (this.saveButtonActive) {
      let newProfile = {name: this.newProfileName, id: this.util.generateUUID()}
      this.profiles.push(newProfile)
      this.newProfileName = ""
      this.dataService.profileData[newProfile.id] = {name: newProfile.name, columnStructure: [], proximity: []};
      localStorage.setItem("profileStructure", JSON.stringify(this.dataService.profileData));
      this.selectedProfile = newProfile;
      this.deleteButtonActive = true;
      this.saveButtonActive = false;
      // this.onItemselect(newProfile)
    }
  }

  onDeleteClick() {
    if (this.deleteButtonActive) {
      this.markForDelete = true;
      // console.log(this.profiles)
      // console.log(this.selectedProfile)
    }
  }

  onDeleteCancel() {
    this.markForDelete = false;
  }

  onDeleteConfirm() {
    let deletedProfile = this.selectedProfile
    let index = this.profiles.indexOf(this.selectedProfile)
    this.profiles.splice(index, 1);
    this.markForDelete = false;
    let id = this.selectedProfile.id;
    delete this.dataService.profileData[`${id}`]
    this.saveProfileSettings(this.dataService.getStandardProfileID());
    this.snackService.showMessage(`Profile ${deletedProfile.name} deleted`, "warning")
    this.deleteButtonActive = false;
  }

  onApply() {
    this.saveProfileSettings(this.selectedProfile.id)
    this.snackService.showMessage(`Profile "${this.dataService.currentProfile.name}" loaded`, "success")
    this.dialogRef.close()
  }

  inputChange() {
    this.saveButtonActive = this.newProfileName.length > 0
  }

  ngOnInit(): void {
    let currentProfile = this.dataService.currentProfileID
    for (let i = 0; i < this.profiles.length; i++) {
      if (this.profiles[i].id == currentProfile) {
        this.selectedProfile = this.profiles[i]
      }
    }
  }

  saveProfileSettings(profileID: string) {
    this.dataService.currentProfileID = profileID;
    localStorage.setItem("profileStructure", JSON.stringify(this.dataService.profileData))
    this.cookieService.set("currentProfileID", this.dataService.currentProfileID, 9999)
    this.dataService.currentProfile = this.dataService.profileData[profileID]
    this.selectedProfile = this.dataService.currentProfile
  }

}
