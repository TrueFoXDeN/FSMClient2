import {CommandSend} from "./command-send";
import {Injectable} from "@angular/core";
import {DataService} from "../data.service";
import {ColumnBuilderService} from "../column-builder.service";

@Injectable({
  providedIn: 'root'
})
export class CreateColumnSendCommand implements CommandSend {
  constructor() {
  }

  execute(data: any): any[] {

    return []
  }

}
