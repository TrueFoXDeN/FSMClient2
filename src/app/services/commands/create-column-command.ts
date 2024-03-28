import {Command} from "./command";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";

@Injectable({
  providedIn: 'root'
})
export class CreateColumnCommand implements Command {
  constructor(private dataService: DataService, private columnBuilderService: ColumnBuilderService) {
  }

  execute(args: string[]): void {
    let colID = args[0];
    let colName = args[1];
    let maxXIndex = 0;
    for (let i = 0; i < this.dataService.profileData[this.dataService.currentProfileID].columnStructure.length; i++) {
      if (this.dataService.profileData[this.dataService.currentProfileID].columnStructure[i].x > maxXIndex) {
        maxXIndex = this.dataService.profileData[this.dataService.currentProfileID].columnStructure[i].x;
      }
    }
    if (this.dataService.profileData[this.dataService.currentProfileID].columnStructure.length === 0) {
      maxXIndex = -1;
    }
    this.dataService.profileData[this.dataService.currentProfileID].columnStructure.push({
      x: maxXIndex + 1,
      y: 0,
      cols: 1,
      rows: 18,
      name: colName,
      uuid: colID
    });
    this.columnBuilderService.columnConfigChanged.next();
  }

}
