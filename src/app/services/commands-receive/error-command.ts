import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";
import {MultiplayerSendService} from "../multiplayer-send.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {SnackbarMessageService} from "../snackbar-message.service";
import {MultiplayerGetDataService} from "../multiplayer-get-data.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorCommand implements CommandReceive {
  constructor(private snackService: SnackbarMessageService, private multiplayerGetDataService: MultiplayerGetDataService) {
  }

  execute(args: any[]): void {
    this.snackService.showMessage(`Error detected. Restored data from server`, "error");
    this.multiplayerGetDataService.execute(args);
  }

}
