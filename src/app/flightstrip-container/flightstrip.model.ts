export class Flightstrip {
  public columnId = "";
  public id: string = "";
  public columnPosition = 0
  public type: stripType;
  public triangleIconState: iconState;
  public callsign: string = "";
  public departureIcao: string = "";
  public arrivalIcao: string = "";
  public aircraft: string = "";
  public status: any;
  public wakeCategory: string = "";
  public flightrule: string = "";
  public altitude: string = "";
  public gate: string = "";
  public info: string = "";
  public airline: string = "";
  public squawk: string = "";
  public runway: string = "";
  public sidStar: string = "";
  public freeText: string = "";
  public route: string = "";
  public compactMode: boolean = false;
  public infosPulled = false;
  public isMarkedBySearch = false;

  constructor(identifier: string, type: stripType, columnId: string, columnPos : number) {
    this.id = identifier;
    this.columnId = columnId
    this.type = type;
    this.columnPosition = columnPos;
    this.triangleIconState = iconState.INACTIVE;
    switch (type) {
      case stripType.INBOUND:
        this.status = statusArrival.ARRIVING
        break;
      case stripType.OUTBOUND:
        this.status = statusDeparture.PARKED
        break;
      case stripType.VFR:
        this.status = statusVfr.PARKED
    }
  }
}

export enum statusDeparture {
  PARKED,
  CLEARED,
  PUSH,
  TAXI,
  HOLD,
  LINEUP,
  TAKEOFF,
  DEPARTED
}

export enum statusArrival {
  ARRIVING,
  LANDING,
  TAXI,
  PARKED
}

export enum statusVfr {
  PARKED,
  TAXI,
  CIRCUIT,
  LEAVE,
  ENTER
}

export enum stripType {
  INBOUND,
  OUTBOUND,
  VFR
}

export enum iconState {
  INACTIVE,
  STANDARD,
  SUCCESS,
  WARNING,
  ERROR
}
