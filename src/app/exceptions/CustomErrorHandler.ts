import {ErrorHandler} from "@angular/core";

export class CustomErrorHandler implements ErrorHandler {
  handleError(err: Error | any): void {
    console.log("Custom error");
    console.log(err);
    //TODO resync data from server when multiplayer connected
  }
}
