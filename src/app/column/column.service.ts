import { Injectable } from '@angular/core';
import {DataService} from "../services/data.service";
@Injectable({
  providedIn: 'root'
})
export class ColumnService {

  constructor(private dataService : DataService) {
  }
  getColumnNameByID(columnID : string){
    let columnArray = this.dataService.profileData?.[this.dataService.currentProfileID].columnStructure
    for(let i = 0; i < columnArray.length; i++){
      if(columnArray[i].uuid == columnID){
        return columnArray[i].name;
      }
    }
    return ""
  }
}
