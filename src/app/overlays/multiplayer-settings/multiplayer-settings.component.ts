import {Component} from '@angular/core';
import {MultiplayerService} from "../../services/multiplayer.service";
import {CookieService} from "ngx-cookie-service";
import {SnackbarMessageService} from "../../services/snackbar-message.service";

@Component({
  selector: 'app-multiplayer-settings',
  templateUrl: './multiplayer-settings.component.html',
  styleUrls: ['./multiplayer-settings.component.scss']
})
export class MultiplayerSettingsComponent {
  createdRoomId: string = "";
  enteredRoomId: string = "";
  enteredName: string = "";
  createPassword: string = "";
  joinPassword: string = "";
  isConnected: boolean = false;
  isCreateDisabled: boolean = true;
  isJoinDisabled: boolean = true;

  constructor(private multiplayerService: MultiplayerService, private cookieService: CookieService,
              private snackService: SnackbarMessageService) {
    if (this.multiplayerService.createdRoomId.length > 0) {
      this.createdRoomId = multiplayerService.createdRoomId
    } else {
      if (this.cookieService.check("createdRoomId")) {
        this.createdRoomId = this.cookieService.get("createdRoomId");
      }
      if(this.cookieService.check('createdRoomPassword')){
        this.createPassword = this.cookieService.get('createdRoomPassword')
      }
    }

    if (this.createdRoomId.length > 0) {

      this.multiplayerService.existsRoom(this.createdRoomId).subscribe({
        next: (response: any) => {
          if (!response.exists) {
            this.createdRoomId = ""
            this.isCreateDisabled = false
            this.multiplayerService.createdRoomId = ''
            this.cookieService.delete('createdRoomId')
            this.cookieService.delete('createdRoomPassword')
          } else {
            this.isCreateDisabled = true
          }

        },
        error: (err) => {

        }
      })

    } else {
      this.isCreateDisabled = false

    }
  }

  createRoom() {
    console.log(this.createPassword)
    this.isCreateDisabled = true;
    this.multiplayerService.createRoom(this.createPassword).subscribe({
      next: (response: any) => {
        this.createdRoomId = response.id
        this.cookieService.set('createdRoomId', this.createdRoomId)
        this.cookieService.set('createdRoomPassword', this.createPassword)
        this.multiplayerService.createdRoomId = this.createdRoomId
        this.enteredRoomId = this.createdRoomId
        this.joinPassword = this.createPassword
        this.isJoinDisabled = false
      },
      error: (err) => {

      }
    });
  }

  joinRoom() {
    this.multiplayerService.existsRoom(this.enteredRoomId).subscribe({
      next: (response: any) => {
        if (response.exists) {
          this.multiplayerService.connect(this.enteredRoomId, this.joinPassword, this.enteredName)
        }else{
          this.snackService.showMessage(`Could not connect to ${this.enteredRoomId}`, "error");
        }

      },
      error: (err) => {
        this.snackService.showMessage(`Could not connect to ${this.enteredRoomId}`, "error");
      }
    })

  }
}
