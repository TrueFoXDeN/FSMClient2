import {Component} from '@angular/core';
import {MultiplayerService} from "../../services/multiplayer.service";
import {CookieService} from "ngx-cookie-service";
import {SnackbarMessageService} from "../../services/snackbar-message.service";
import {DialogRef} from "@angular/cdk/dialog";
import {DataService} from "../../services/data.service";
import {MultiplayerSendService} from "../../services/multiplayer-send.service";

@Component({
  selector: 'app-multiplayer-settings',
  templateUrl: './multiplayer-settings.component.html',
  styleUrls: ['./multiplayer-settings.component.scss']
})
export class MultiplayerSettingsComponent {
  createdRoomId: string = "";
  enteredRoomId: string = "abcde";
  enteredName: string = "laurenz";
  createPassword: string = "";
  joinPassword: string = "test";
  isConnected: boolean = false;
  isCreateDisabled: boolean = true;
  isJoinDisabled: boolean = false;
  isDisconnectDisabled: boolean = true;
  clients :string[] = []
  selectedClient: any;

  constructor(private multiplayerService: MultiplayerService, private cookieService: CookieService,
              private snackService: SnackbarMessageService, private dialogRef: DialogRef, private dataService: DataService,
              private multiplayerSendService: MultiplayerSendService) {

    this.isConnected = multiplayerService.isConnected
    this.isCreateDisabled = multiplayerService.isCreateDisabled
    this.isJoinDisabled = multiplayerService.isJoinDisabled
    this.isDisconnectDisabled = multiplayerService.isDisconnectDisabled
    this.clients = multiplayerService.clients
    console.log(this.clients)

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
            this.multiplayerService.isCreateDisabled = false
            this.multiplayerService.createdRoomId = ''
            this.cookieService.delete('createdRoomId')
            this.cookieService.delete('createdRoomPassword')
          } else {
            this.isCreateDisabled = true
            this.multiplayerService.isCreateDisabled = true
          }

        },
        error: (err) => {

        }
      })

    } else {
      this.isCreateDisabled = false
      this.multiplayerService.isCreateDisabled = false

    }

    if(this.isConnected){
      multiplayerSendService.processMessage('get_clients', [])
    }
  }

  createRoom() {

    if(!this.isCreateDisabled){
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
          this.multiplayerService.isJoinDisabled = false
        },
        error: (err) => {

        }
      });
    }

  }

  joinRoom() {
    if(!this.isJoinDisabled){
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
      });
      this.isDisconnectDisabled = false
      this.multiplayerService.isDisconnectDisabled = false
      this.isJoinDisabled = true
      this.multiplayerService.isJoinDisabled = true
      this.dialogRef.close();

    }

  }

  disconnectRoom() {
    if(!this.isDisconnectDisabled){
      this.multiplayerService.disconnect()
      this.isJoinDisabled = false
      this.multiplayerService.isJoinDisabled = false
      this.isDisconnectDisabled = true
      this.multiplayerService.isDisconnectDisabled = true
      this.dialogRef.close();
    }

  }

  refreshRoom() {
    if(this.isConnected){

    }
  }
}
