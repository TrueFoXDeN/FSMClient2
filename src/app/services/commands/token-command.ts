import {Command} from "./command";
import {SnackbarMessageService} from "../snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";

@Injectable({
  providedIn: 'root'
})
export class TokenCommand implements Command {
  constructor(private snackService: SnackbarMessageService, private cookieService: CookieService, private dataService: DataService, private columnBuilderService: ColumnBuilderService) {
  }

  execute(args: string[]): void {
    this.snackService.showMessage(`Connected to Multiplayer`, "success");
    this.cookieService.set('multiplayerAuth', args[0])
    this.dataService.currentProfileID = this.dataService.multiplayerProfileID
    this.dataService.profileData[this.dataService.multiplayerProfileID] = this.dataService.multiplayerProfile
    this.dataService.currentProfile = this.dataService.multiplayerProfile
    this.columnBuilderService.columnConfigChanged.next()

  }

}
