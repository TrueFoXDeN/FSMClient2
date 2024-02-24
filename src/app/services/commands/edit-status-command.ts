import {Command} from "./command";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class EditStatusCommand implements Command {
  execute(args: string[]): void {
    console.log('edit status')
  }

}
