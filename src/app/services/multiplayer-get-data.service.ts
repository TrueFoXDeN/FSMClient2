import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {ColumnBuilderService} from "./column-builder.service";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";

@Injectable({
  providedIn: 'root'
})
export class MultiplayerGetDataService {

  constructor(private dataService: DataService, private columnBuilderService: ColumnBuilderService, private fsService: FlightstripService) {
  }

  execute(args: any[]): void {
    this.dataService.currentProfileID = this.dataService.multiplayerProfileID
    this.dataService.profileData[this.dataService.multiplayerProfileID] = this.dataService.multiplayerProfile
    this.dataService.currentProfile = this.dataService.multiplayerProfile


    let data = args[1].data
    let order = args[1].order
    console.log("order:");
    console.log(args);
    const columnIDs: string[] = Object.keys(order) || [];

    let dashboard = [];
    let foundDashboardDiff = 0;
    let liveDataMap = new Set<string>();
    for (let i = 0; i < this.dataService.profileData[this.dataService.currentProfileID].columnStructure.length; i++) {
      liveDataMap.add(this.dataService.profileData[this.dataService.currentProfileID].columnStructure[i].uuid);
    }

    console.log("Live Size:")
    console.log(liveDataMap.size)

    for (let i = 0; i < columnIDs.length; i++) {
      dashboard.push({x: i, y: 0, cols: 1, rows: 18, uuid: columnIDs[i], name: data[columnIDs[i]]["name"]});
      if (!liveDataMap.has(columnIDs[i])) {
        foundDashboardDiff += 1;
      }
    }
    console.log("Server Size:")
    console.log(dashboard.length)

    if (liveDataMap.size != dashboard.length) {
      foundDashboardDiff += 1;
    }

    if (foundDashboardDiff > 0) {
      console.log("Found Columndiff");
      this.dataService.profileData[this.dataService.currentProfileID].columnStructure = dashboard
    }
    this.dataService.flightstripData = {};
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
  }
}
