import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetClientsSendCommand implements CommandSend {
  execute(args: string[]): void {
    console.log('get clients')
  }

}
