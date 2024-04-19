import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {SnackbarMessageService} from "../snackbar-message.service";
import {MultiplayerService} from "../multiplayer.service";

@Injectable({
  providedIn: 'root'
})
export class RoomClosedCommand implements CommandReceive {
  constructor(private snackbarService: SnackbarMessageService, private multiplayerService: MultiplayerService) {
  }

  execute(args: any[]): void {
    this.multiplayerService.clients = [];
    this.snackbarService.showMessage(`Room closed due to inactivity`, "error");
  }
}
