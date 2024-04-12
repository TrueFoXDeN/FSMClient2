import {CommandReceive} from "./command-receive";
import {SnackbarMessageService} from "../snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";
import {Util} from "../../util";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {MultiplayerGetDataService} from "../multiplayer-get-data.service";

@Injectable({
  providedIn: 'root'
})
export class TokenReceiveCommand implements CommandReceive {
  constructor(private snackService: SnackbarMessageService, private cookieService: CookieService, private dataService: DataService, private columnBuilderService: ColumnBuilderService,
              private util: Util, private fsService: FlightstripService, private multiplayerGetDataService: MultiplayerGetDataService) {
  }

  execute(args: any[]): void {
    this.snackService.showMessage(`Connected to Multiplayer`, "success");
    this.cookieService.set('multiplayerAuth', args[0])
    this.multiplayerGetDataService.execute(args);
  }

}
