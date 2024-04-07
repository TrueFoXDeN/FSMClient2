import {CommandReceive} from "./command-receive";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetClientsReceiveCommand implements CommandReceive {
  execute(args: string[]): void {
    console.log('get clients')
  }

}
