import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnService} from "../../column/column.service";
import {MultiplayerSendService} from "../multiplayer-send.service";

@Injectable({
  providedIn: 'root'
})
export class MoveFlightstripReceiveCommand implements CommandReceive {
  constructor(private fsService: FlightstripService, private dataService: DataService, private columnService: ColumnService, private multiplayerSendService: MultiplayerSendService) {
  }

  execute(args: string[]): void {

    let colId = args[0];
    let fsID = args[1];
    let newColId = args[2];
    let newPos = Number(args[3]);
    let fsIndex = this.fsService.getIndexInColumnByID(colId, fsID);
    if (fsIndex === -1) {
      this.multiplayerSendService.processMessage("get_data", [])
      console.log("Could not find flightstrip");
      return;
    }

    if (colId === newColId) {
      if (!this.columnService.dragActive) {
        moveItemInArray(this.dataService.flightstripData[colId].flightstrips, fsIndex, newPos);
      }

    } else {

      transferArrayItem(
        this.dataService.flightstripData[colId].flightstrips,
        this.dataService.flightstripData[newColId].flightstrips,
        fsIndex,
        newPos,
      );

    }


    this.fsService.changedStripPos.next({id: fsID, newPosition: newPos});
    this.fsService.dragActive.next({id: fsID, dragEnabled: false})
    this.columnService.changeDetection.next()
  }
}
