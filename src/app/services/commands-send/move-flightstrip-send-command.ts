import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MoveFlightstripSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {

    return [
      data.oldColumnId,
      data.fsId,
      data.newColumnId,
      data.newPos
    ]
  }

  //
  //    fsId: event.item.data.id,
  //         oldColumnId: this.uuid,
  //         newColumnId: this.uuid,
  //         newPos: event.currentIndex,
  //         oldPos: event.previousIndex

}
