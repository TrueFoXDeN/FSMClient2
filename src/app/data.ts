import {GridsterItem} from "angular-gridster2";

export class Data {
  public columnStructure: Array<GridsterItem> = []
  public flightstripData: any = {
    "df15497a-1782-4088-b40c-9714e75ac197": {
      "name": "Ground",
      "flightstrips": [
        {
          "columnId": "df15497a-1782-4088-b40c-9714e75ac197",
          "id": "115fb5f3-518c-4aaf-99d9-71934a6c2a8f",
          "callsign": "DLH26F",
          "departureIcao": "EDDF",
          "arrivalIcao": "EDDK",
          "aircraft": "A320",
          "wakeCategory": "M",
          "flightrule": "I",
          "altitude": "FL70",
          "gate": "12",
          "info": "Infos",
          "airline": "LUFTHANSA",
          "squawk": "1000",
          "runway": "26L",
          "sidStar": "MARUN5M",
          "freeText": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr",
          "type": 1,
          "triangleIconState": 0,
          "status": 0,
          "compactMode" : true,
          "route":"OBOK2G OBOKA Z28 DIBIR BUDIP RAVLO Y70 OTBED L60 PENIL M144 BAGSO ETARI NATD IRLOK N584B MT J545 YVO Q923 HOCKE Q824 FNT J547 OBK J100 OBH J10 HBU J146 NOOTN Q88 LAKRR Q73 HAKMN ANJLL4"
        }
      ]
    },
    "54442b1f-551f-4640-8c80-d5b4123be756": {
      "name": "Tower",
      "flightstrips": []
    },
    "8f58c69a-de55-45c2-99e7-6f29901bec43": {
      "name": "Approach",
      "flightstrips": []
    }
  }

  constructor() {
  }

}
