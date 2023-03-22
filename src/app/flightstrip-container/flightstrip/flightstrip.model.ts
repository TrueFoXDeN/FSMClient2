export class Flightstrip {
  public columnId = "";
  public id: string = "";
  public type: stripType
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
  public squawk: number = 0;
  public runway: string = "";
  public sidStar: string = "";
  public freeText: string = "";


  constructor(identifier: string, type: stripType, columnId: string) {
    this.id = identifier;
    this.columnId = columnId
    this.type = type;
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
  LINEUP,
  TAKEOFF
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
