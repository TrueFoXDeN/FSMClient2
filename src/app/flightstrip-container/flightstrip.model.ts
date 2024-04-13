export class Flightstrip {
  public columnId = "";
  public id: string = "";
  public columnPosition = 0
  public type: StripType;
  public triangleIconState: TriangleIconState;
  public communicationIconState: CommunicationIconState;
  public callsign: string = "";
  public departureIcao: string = "";
  public arrivalIcao: string = "";
  public aircraft: string = "";
  public status: any;
  public statusText : string = "";
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
  public emergencyActive: boolean = false;
  public deleteActive: boolean = false;
  public isMouseOver: boolean = false;

  constructor(identifier: string, type: StripType, columnId: string, columnPos : number) {
    this.id = identifier;
    this.columnId = columnId
    this.type = type;
    this.columnPosition = columnPos;
    this.triangleIconState = TriangleIconState.INACTIVE;
    this.communicationIconState = CommunicationIconState.VOICE;
    switch (type) {
      case StripType.INBOUND:
        this.status = StatusArrival.ARRIVING
        this.statusText = StatusArrival[this.status];
        break;
      case StripType.OUTBOUND:
        this.status = StatusDeparture.PARKED
        this.statusText = StatusDeparture[this.status];
        break;
      case StripType.VFR:
        this.status = StatusVfr.PARKED;
        this.statusText = StatusDeparture[this.status];
    }
  }
}

export enum StatusDeparture {
  PARKED,
  CLEARED,
  PUSH,
  TAXI,
  HOLD,
  LINEUP,
  TAKEOFF,
  DEPARTED
}

export enum StatusArrival {
  ARRIVING,
  LANDING,
  TAXI,
  PARKED
}

export enum StatusVfr {
  PARKED,
  TAXI,
  CIRCUIT,
  LEAVE,
  ENTER
}

export enum StripType {
  INBOUND,
  OUTBOUND,
  VFR
}

export enum TriangleIconState {
  INACTIVE,
  STANDARD,
  SUCCESS,
  WARNING,
  ERROR
}

export enum CommunicationIconState {
  VOICE,
  TEXT
}
