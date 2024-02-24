import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class DeleteColumnCommand implements Command {
  execute(args: string[]): void {
    console.log('delete column')
  }

}
