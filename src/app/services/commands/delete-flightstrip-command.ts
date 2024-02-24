import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class DeleteFlightstripCommand implements Command {
  execute(args: string[]): void {
    console.log('delete flightstrip')
  }

}
