import {Injectable} from '@angular/core';
import {MultiplayerService} from "./multiplayer.service";
import {CommandSend} from "./commands-send/command-send";
import {CreateColumnSendCommand} from "./commands-send/create-column-send-command";
import {CreateFlightstripSendCommand} from "./commands-send/create-flightstrip-send-command";
import {DeleteFlightstripSendCommand} from "./commands-send/delete-flightstrip-send-command";
import {GetClientsSendCommand} from "./commands-send/get-clients-send-command";
import {GetDataSendCommand} from "./commands-send/get-data-send-command";
import {MoveFlightstripSendCommand} from "./commands-send/move-flightstrip-send-command";
import {DeleteColumnSendCommand} from "./commands-send/delete-column-send-command";
import {EditFlightstripSendCommand} from "./commands-send/edit-flightstrip-send-command";


@Injectable({
  providedIn: 'root'
})
export class MultiplayerSendService {
  commands = new Map<string, CommandSend>()

  constructor(private multiplayerService: MultiplayerService,
              private createColumnCommand: CreateColumnSendCommand,
              private createFlightstripCommand: CreateFlightstripSendCommand, private deleteColumnCommand: DeleteColumnSendCommand,
              private deleteFlightStripCommand: DeleteFlightstripSendCommand, private editFlightStripCommand: EditFlightstripSendCommand,
              private getClientsCommand: GetClientsSendCommand,
              private getDataCommand: GetDataSendCommand, private moveFlightstripCommand: MoveFlightstripSendCommand) {

    this.commands.set('create_column', createColumnCommand)
    this.commands.set('create_flightstrip', createFlightstripCommand)
    this.commands.set('delete_column', deleteColumnCommand)
    this.commands.set('delete_flightstrip', deleteFlightStripCommand)
    this.commands.set('edit_flightstrip', editFlightStripCommand)
    this.commands.set('get_clients', getClientsCommand)
    this.commands.set('get_data', getClientsCommand)
    this.commands.set('move_flightstrip', moveFlightstripCommand)
  }

  processMessage(cmd: string, data: any) {
    let command = this.commands.get(cmd)
    let args: any[] = []
    if (command) {
      args = command.execute(data)
    } else {
      console.log(data.cmd + ' is not implemented')
    }
    this.multiplayerService.sendMessage(cmd, args)
  }

}
