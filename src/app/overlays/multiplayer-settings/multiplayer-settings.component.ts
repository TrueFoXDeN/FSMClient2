import { Component } from '@angular/core';
import {MultiplayerService} from "../../services/multiplayer.service";

@Component({
  selector: 'app-multiplayer-settings',
  templateUrl: './multiplayer-settings.component.html',
  styleUrls: ['./multiplayer-settings.component.scss']
})
export class MultiplayerSettingsComponent {
  createdRoomId: string = "";
  enteredRoomid: string = "";
  createPassword: string = "";
  joinPassword: string = "";
  isConnected: boolean = false;

  constructor(private multiplayerService: MultiplayerService) {
    this.isConnected = multiplayerService.isConnected
  }

  createRoom() {
    console.log(this.createPassword)
    this.multiplayerService.createRoom(this.createPassword).subscribe({
      next: (response: any) => {
        this.createdRoomId = response.id
        this.enteredRoomid = this.createdRoomId
        // console.log(this.createPassword)
        this.joinPassword = this.createPassword
      },
      error: (err) => {

      }
    });
    // this.createdRoomId = 'a5Xde'

  }

  joinRoom() {

  }
}
