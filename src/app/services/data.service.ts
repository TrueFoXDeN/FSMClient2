import {Injectable} from "@angular/core";
import {GridsterItem} from "angular-gridster2";
import {Airport} from "../overlays/proximity-settings/proximity.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //public columnStructure: Array<GridsterItem> = []
  public proximity: Airport[] = []
  public flightstripData: any = {}
  public profileData: any = {}
  public readonly standardProfile = {
    "name": "Default",
    "columnStructure": [],
    "proximity": []
  }
  public currentProfileID = "a6574bc2-4351-40be-b5ed-eda88ee2c06c"
  public currentProfile: any = this.standardProfile
  public archivedStrips: any = {}
  public uid = ''

  public multiplayerProfileID = 'a91ad3bf-6fd9-469c-8471-213df3871dc5'
  public readonly multiplayerProfile = {
    "name": "Multiplayer",
    "columnStructure": [],
    "proximity": []
  }

  public getStandardProfileID() {
    return "a6574bc2-4351-40be-b5ed-eda88ee2c06c"
  }
}
