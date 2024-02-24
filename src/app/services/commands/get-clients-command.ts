import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetClientsCommand implements Command {
  execute(args: string[]): void {
    console.log('get clients')
  }

}
