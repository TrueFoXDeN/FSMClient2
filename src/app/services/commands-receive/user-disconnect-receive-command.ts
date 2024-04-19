import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
import {SnackbarMessageService} from "../snackbar-message.service";

@Injectable({
  providedIn: 'root'
})
export class UserDisconnectReceiveCommand implements CommandReceive {
  constructor(private snackbarService: SnackbarMessageService) {
  }

  execute(args: any[]): void {
    this.snackbarService.showMessage(`User ${args[0]} disconnected`, "info");
  }
}
