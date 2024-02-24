import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class EditFlightstripCommand implements Command {
  execute(args: string[]): void {
    console.log('edit flightstrip')
  }

}
