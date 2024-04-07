import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class EditFlightstripSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {
    return []
  }

}
