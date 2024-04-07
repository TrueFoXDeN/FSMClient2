import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {StripType} from "../../flightstrip-container/flightstrip.model";

@Injectable({
  providedIn: 'root'
})
export class CreateFlightstripReceiveCommand implements CommandReceive {
  constructor(private fsService: FlightstripService) {
  }

  execute(args: string[]): void {

    let colID = args[0];
    let fsID = args[1];
    let fsType: number = Number(args[2]);
    this.fsService.createFlightstrip(colID, "", fsType, fsID);
  }

}
