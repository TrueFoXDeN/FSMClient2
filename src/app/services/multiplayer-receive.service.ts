import { Injectable } from '@angular/core';

import {SnackbarMessageService} from "./snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {TokenReceiveCommand} from "./commands-receive/token-receive-command";
import {CreateColumnReceiveCommand} from "./commands-receive/create-column-receive-command";
import {CreateFlightstripReceiveCommand} from "./commands-receive/create-flightstrip-receive-command";
import {DeleteColumnReceiveCommand} from "./commands-receive/delete-column-receive-command";
import {DeleteFlightstripReceiveCommand} from "./commands-receive/delete-flightstrip-receive-command";
import {EditFlightstripReceiveCommand} from "./commands-receive/edit-flightstrip-receive-command";
import {GetClientsReceiveCommand} from "./commands-receive/get-clients-receive-command";
import {GetDataReceiveCommand} from "./commands-receive/get-data-receive-command";
import {MoveFlightstripReceiveCommand} from "./commands-receive/move-flightstrip-receive-command";
import {CommandReceive} from "./commands-receive/command-receive";

@Injectable({
  providedIn: 'root'
})
export class MultiplayerReceiveService {

  commands = new Map<string, CommandReceive>()

  constructor(private snackService: SnackbarMessageService, private cookieService: CookieService,
              private tokenCommand: TokenReceiveCommand, private createColumnCommand: CreateColumnReceiveCommand,
              private createFlightstripCommand: CreateFlightstripReceiveCommand, private deleteColumnCommand: DeleteColumnReceiveCommand,
              private deleteFlightStripCommand: DeleteFlightstripReceiveCommand, private editFlightStripCommand: EditFlightstripReceiveCommand,
              private getClientsCommand: GetClientsReceiveCommand,
              private getDataCommand: GetDataReceiveCommand, private moveFlightstripCommand: MoveFlightstripReceiveCommand,
  ) {
    this.commands.set('token', tokenCommand)
    this.commands.set('create_column', createColumnCommand)
    this.commands.set('create_flightstrip', createFlightstripCommand)
    this.commands.set('delete_column', deleteColumnCommand)
    this.commands.set('delete_flightstrip', deleteFlightStripCommand)
    this.commands.set('edit_flightstrip', editFlightStripCommand)
    this.commands.set('get_clients', getClientsCommand)
    this.commands.set('get_data', getClientsCommand)
    this.commands.set('move_flightstrip', moveFlightstripCommand)
  }

  processMessage(data: any) {

    data = JSON.parse(data)
    console.log(data)

    let cmd = this.commands.get(data.cmd)

    if (cmd) {
      cmd.execute(data.args)
    } else {
      console.log(data.cmd + ' is not implemented')
    }


  }
}
