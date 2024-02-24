import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class GetDataCommand implements Command {
  execute(args: string[]): void {
    console.log('get data')
  }

}
