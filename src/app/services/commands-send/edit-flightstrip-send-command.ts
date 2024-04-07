import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EditFlightstripSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {
    console.log(data)
    return [data.columnId, data.id, data]
  }

}
