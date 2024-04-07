import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteColumnReceiveCommand implements CommandReceive {
  constructor(private dataService: DataService) {
  }

  execute(args: string[]): void {

    let colID = args[0];
    let colIndex = -1;
    for (let i = 0; i < this.dataService.profileData[this.dataService.currentProfileID].columnStructure.length; i++) {
      if (this.dataService.profileData[this.dataService.currentProfileID].columnStructure[i].uuid === colID) {
        colIndex = i;
      }
    }
    if (colIndex > -1) {
      this.dataService.profileData[this.dataService.currentProfileID].columnStructure.splice(colIndex, 1);

    }

    delete this.dataService.flightstripData[colID];


  }

}
