export class Airport{
  active: boolean;
  icao: string;
  inboundColumn: string;
  outboundColumn: string;
  range: number;
  vfrColumn: string;

  constructor() {
    this.active = false;
    this.icao = "";
    this.inboundColumn = "";
    this.outboundColumn = "";
    this.range = 25;
    this.vfrColumn = "";
  }


}
