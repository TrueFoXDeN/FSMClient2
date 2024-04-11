import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";
import {MultiplayerSendService} from "../multiplayer-send.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorCommand implements CommandReceive {
  constructor(private mpSendService: MultiplayerSendService) {
  }

  execute(args: any[]): void {
    console.log(args)
  }

}
