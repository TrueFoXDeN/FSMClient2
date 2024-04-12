import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {MultiplayerGetDataService} from "../multiplayer-get-data.service";
import {SnackbarMessageService} from "../snackbar-message.service";


@Injectable({
  providedIn: 'root'
})
export class GetDataReceiveCommand implements CommandReceive {
  constructor(private multiplayerGetDataService: MultiplayerGetDataService, private snackBarService: SnackbarMessageService) {
  }

  execute(args: string[]): void {

    this.multiplayerGetDataService.execute(args);
    this.snackBarService.showMessage("Synced with server", "success")

  }
}
