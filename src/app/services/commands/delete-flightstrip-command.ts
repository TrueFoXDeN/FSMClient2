import {Command} from "./command";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteFlightstripCommand implements Command {
  constructor(private fsService: FlightstripService, private dataService: DataService) {
  }

  execute(args: string[]): void {
    let colID = args[0];
    let fsID = args[1];
    let fsIndex = -1;
    for (let i = 0; i < this.dataService.flightstripData[colID].flightstrips.length; i++) {
      if (this.dataService.flightstripData[colID].flightstrips[i].id === fsID) {
        fsIndex = i;
      }
    }
    if (fsIndex > -1) {
      this.dataService.flightstripData[colID].flightstrips.splice(fsIndex, 1);
    }
  }

}
