import {ErrorHandler} from "@angular/core";
import {MultiplayerSendService} from "../services/multiplayer-send.service";
import {MultiplayerService} from "../services/multiplayer.service";

export class CustomErrorHandler implements ErrorHandler {


  handleError(err: Error | any): void {
    console.log(err);
  }
}
