import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class DeleteColumnSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {
    return [
      data.id
    ]
  }

}
