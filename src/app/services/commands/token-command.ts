import {Command} from "./command";
import {SnackbarMessageService} from "../snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";
import {Util} from "../../util";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";

@Injectable({
  providedIn: 'root'
})
export class TokenCommand implements Command {
  constructor(private snackService: SnackbarMessageService, private cookieService: CookieService, private dataService: DataService, private columnBuilderService: ColumnBuilderService,
              private util: Util, private fsService: FlightstripService) {
  }

  execute(args: any[]): void {
    this.snackService.showMessage(`Connected to Multiplayer`, "success");
    this.cookieService.set('multiplayerAuth', args[0])

    this.dataService.currentProfileID = this.dataService.multiplayerProfileID
    this.dataService.profileData[this.dataService.multiplayerProfileID] = this.dataService.multiplayerProfile
    this.dataService.currentProfile = this.dataService.multiplayerProfile
    let data = args[1].data
    let order = args[1].order
    console.log(args)
    const columnIDs: string[] = Object.keys(data);
    let dashboard = [];
    for (let i = 0; i < columnIDs.length; i++) {
      dashboard.push({x: i, y: 0, cols: 1, rows: 18, uuid: columnIDs[i], name: data[columnIDs[i]]["name"]});
    }
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure = dashboard
    this.columnBuilderService.columnConfigChanged.next()

    for (let i = 0; i < columnIDs.length; i++) {
      let columnID = columnIDs[i];
      let fsIDs: string[] = order[columnID];
      for (let k = 0; k < fsIDs.length; k++) {
        let fsID = fsIDs[k];
        let fsType: number = data[columnID][fsID]["type"]
        this.fsService.createFlightstrip(columnID, "", fsType, fsID);
      }
    }
  }

}
