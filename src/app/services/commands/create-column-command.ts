import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class CreateColumnCommand implements Command {
  execute(args: string[]): void {
    console.log('create column')
  }

}
