import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {MultiplayerService} from "../multiplayer.service";
@Injectable({
  providedIn: 'root'
})
export class GetClientsReceiveCommand implements CommandReceive {
  constructor(private multiplayerService: MultiplayerService) {
  }
  execute(args: any[]): void {
    this.multiplayerService.clients = args
  }

}
