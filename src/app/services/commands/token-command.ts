import {Command} from "./command";
import {SnackbarMessageService} from "../snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class TokenCommand implements Command {
  constructor(private snackService: SnackbarMessageService, private cookieService: CookieService) {
  }

  execute(args: string[]): void {
    this.snackService.showMessage(`Connected to Multiplayer`, "success");
    this.cookieService.set('multiplayerAuth', args[0])
  }

}
