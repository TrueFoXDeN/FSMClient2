import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteFlightstripSendCommand implements CommandSend {
  constructor(private fsService: FlightstripService, private dataService: DataService) {
  }

  execute(args: string[]): void {
    let colID = args[0];
    let fsID = args[1];

    let fsIndex = this.fsService.getIndexInColumnByID(colID, fsID);
    if (fsIndex > -1) {
      this.dataService.flightstripData[colID].flightstrips.splice(fsIndex, 1);
    }
  }

}
