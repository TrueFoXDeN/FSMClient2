import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetClientsSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {
    return []
  }

}
