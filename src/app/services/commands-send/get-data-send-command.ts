import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetDataSendCommand implements CommandSend {
  execute(args: string[]): void {
    console.log('get data')
  }

}
