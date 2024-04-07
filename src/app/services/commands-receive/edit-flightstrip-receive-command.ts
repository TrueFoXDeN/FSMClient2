import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";
import {Flightstrip} from "../../flightstrip-container/flightstrip.model";

@Injectable({
  providedIn: 'root'
})
export class EditFlightstripReceiveCommand implements CommandReceive {
  constructor(private fsService: FlightstripService, private dataService: DataService) {
  }

  execute(args: any[]): void {
    let colID = args[0];
    let fsID = args[1];
    let fsData = args[2];
    let fsIndex = this.fsService.getIndexInColumnByID(colID, fsID);
    if (fsIndex === -1) {
      return;
    }

    let fs: Flightstrip = this.dataService.flightstripData[colID].flightstrips[fsIndex];

    fs.callsign = fsData.callsign || "";
    fs.departureIcao = fsData.departureIcao || "";
    fs.arrivalIcao = fsData.arrivalIcao || "";
    fs.aircraft = fsData.aircraft || "";

    fs.wakeCategory = fsData.wakeCategory || "";
    fs.flightrule = fsData.flightrule || "";
    fs.altitude = fsData.altitude || "";
    fs.gate = fsData.gate || "";
    fs.info = fsData.info || "";
    fs.airline = fsData.airline || "";
    fs.squawk = fsData.squawk || "";
    fs.runway = fsData.runway || "";
    fs.sidStar = fsData.sidStar || "";
    fs.freeText = fsData.freeText || "";
    fs.route = fsData.route || "";
    fs.triangleIconState = fsData.triangleIconState || 0;
    fs.communicationIconState = fsData.communicationIconState || 0;
    fs.statusText = fsData.statusText || "";
    fs.status = fsData.status || 0;
    fs.emergencyActive = fsData.emergencyActive || false;

  }

}
