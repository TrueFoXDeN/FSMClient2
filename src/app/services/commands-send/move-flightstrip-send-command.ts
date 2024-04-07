import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";
import {Flightstrip} from "../../flightstrip-container/flightstrip.model";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class MoveFlightstripSendCommand implements CommandSend {
  constructor(private fsService: FlightstripService, private dataService: DataService) {
  }

  execute(args: string[]): void {
    let colId = args[0];
    let fsID = args[1];
    let newColId = args[2];
    let newPos = Number(args[3]);
    let fsIndex = this.fsService.getIndexInColumnByID(colId, fsID);
    if (fsIndex === -1) {
      console.log("Could not find flightstrip");
      return;
    }
    if (colId === newColId) {
      moveItemInArray(this.dataService.flightstripData[colId].flightstrips, fsIndex, newPos);
    } else {
      transferArrayItem(
        this.dataService.flightstripData[colId].flightstrips,
        this.dataService.flightstripData[newColId].flightstrips,
        fsIndex,
        newPos,
      );
    }
    this.fsService.changedStripPos.next({id: fsID, newPosistion: newPos})

  }

}
