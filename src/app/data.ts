import {GridsterItem} from "angular-gridster2";

export class Data {
  public columnStructure: Array<GridsterItem> = []
  public flightstripData: any = {}
  public profileData: any = {}
  public readonly standardProfile = {
    "name": "Default",
    "columnStructure": []
  }
  public currentProfileID = "a6574bc2-4351-40be-b5ed-eda88ee2c06c"
  public currentProfile: any = {}
  public lastUsedProfileID = ""
  public archivedStrips: any = {}

  public getStandardProfileID() {
    return "a6574bc2-4351-40be-b5ed-eda88ee2c06c"
  }

  constructor() {
  }

}
