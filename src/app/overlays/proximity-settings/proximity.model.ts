export class Airport{
  active: boolean;
  icaoCode: string;
  inboundColumn: string;
  outboundColumn: string;
  range: number;
  vfrColumn: string;

  constructor() {
    this.active = false;
    this.icaoCode = "";
    this.inboundColumn = "";
    this.outboundColumn = "";
    this.range = 0;
    this.vfrColumn = "";
  }


}
