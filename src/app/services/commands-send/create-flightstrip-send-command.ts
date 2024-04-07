import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CreateFlightstripSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {
    return [data.colId, data.fsId, data.type]
  }

}
