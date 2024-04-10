import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {DataService} from "../data.service";
import {moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnService} from "../../column/column.service";

@Injectable({
  providedIn: 'root'
})
export class MoveFlightstripReceiveCommand implements CommandReceive {
  constructor(private fsService: FlightstripService, private dataService: DataService, private columnService: ColumnService) {
  }

  execute(args: string[]): void {
    console.log(this.dataService.flightstripData)
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
    this.fsService.changedStripPos.next({id: fsID, newPosition: newPos});
    this.fsService.dragChange.next({id: fsID, dragEnabled: false})
    this.columnService.changeDetection.next()
  }
}
