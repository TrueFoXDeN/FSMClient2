import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {SnackbarMessageService} from "../snackbar-message.service";

@Injectable({
  providedIn: 'root'
})
export class RoomClosedCommand implements CommandReceive {
  constructor(private snackbarService: SnackbarMessageService) {
  }

  execute(args: any[]): void {
    this.snackbarService.showMessage(`Room closed due to inactivity`, "error");
  }
}
