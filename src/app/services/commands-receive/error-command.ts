import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";
import {MultiplayerSendService} from "../multiplayer-send.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorCommand implements CommandReceive {
  constructor(private mpSendService: MultiplayerSendService, private dataService: DataService, private columnBuilderService: ColumnBuilderService, private fsService: FlightstripService) {
  }

  execute(args: any[]): void {
    let data = args[1].data
    let order = args[1].order
    const columnIDs: string[] = Object.keys(data);
    // let dashboard = [];
    // for (let i = 0; i < columnIDs.length; i++) {
    //   dashboard.push({x: i, y: 0, cols: 1, rows: 18, uuid: columnIDs[i], name: data[columnIDs[i]]["name"]});
    // }
    // this.dataService.profileData[this.dataService.currentProfileID].columnStructure = dashboard
    this.columnBuilderService.columnConfigChanged.next()

    for (let i = 0; i < columnIDs.length; i++) {
      let columnID = columnIDs[i];
      let fsIDs: string[] = order[columnID];
      for (let k = 0; k < fsIDs.length; k++) {
        let fsID = fsIDs[k];
        let fsType: number = data[columnID][fsID]["type"]
        this.fsService.createFlightstripWithObject(columnID, fsID, data[columnID][fsID], true)
      }
    }
    console.log("RELOAD DATA!!!!!11!!!");
  }

}
