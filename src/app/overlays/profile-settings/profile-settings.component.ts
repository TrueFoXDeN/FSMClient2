import {Component, OnInit} from '@angular/core';
import {Util} from "../../util";
import {Data} from "../../data";
import {CookieService} from "ngx-cookie-service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarMessageService} from "../../services/snackbar-message.service";
import {ColumnBuilderService} from "../../services/column-builder.service";

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

  constructor(private util: Util, private globalData: Data, private cookieService: CookieService,
              public dialogRef: MatDialogRef<ProfileSettingsComponent>, private snackService: SnackbarMessageService,
              private columnBuilderService: ColumnBuilderService) {
    const obj: any = this.globalData.profileData;
    Object.keys(obj).forEach((id: string) => {
      this.profiles.push({id: id, name: obj[id].name})
    });
  }

  onItemselect(option: any) {
    if (option.id != this.globalData.getStandardProfileID()) {
      this.deleteButtonActive = true;
    } else {
      this.deleteButtonActive = false;
    }
    this.selectedProfile = option;
  }

  saveProfile() {
    if (this.saveButtonActive) {
      let newProfile = {name: this.newProfileName, id: this.util.generateUUID()}
      this.profiles.push(newProfile)
      this.onItemselect(newProfile)
      this.newProfileName = ""
      this.globalData.profileData[newProfile.id] = {name: newProfile.name, columnStructure: []};
      localStorage.setItem("profileStructure", JSON.stringify(this.globalData.profileData))
    }
  }

  onDeleteClick() {
    if (this.deleteButtonActive) {
      this.markForDelete = true;
      console.log(this.profiles)
      console.log(this.selectedProfile)
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
    delete this.globalData.profileData[`${id}`]
    this.saveProfileSettings(this.globalData.getStandardProfileID());
    this.snackService.showMessage(`Profile ${deletedProfile.name} deleted`, "warning")
  }

  onApply() {
    this.saveProfileSettings(this.selectedProfile.id)
    this.snackService.showMessage(`Profile "${this.globalData.currentProfile.name}" loaded`, "success")

    this.dialogRef.close()
  }

  inputChange() {
    this.saveButtonActive = this.newProfileName.length > 0
  }

  ngOnInit(): void {
  }

  saveProfileSettings(profileID: string) {


    this.globalData.currentProfileID = profileID;
    localStorage.setItem("profileStructure", JSON.stringify(this.globalData.profileData))
    this.cookieService.set("currentProfileID", this.globalData.currentProfileID, 9999)
    this.globalData.currentProfile = this.globalData.profileData[profileID]
  }


}
