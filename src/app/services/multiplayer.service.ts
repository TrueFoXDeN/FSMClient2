import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackbarMessageService} from "./snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {CreateFlightstripCommand} from "./commands/create-flightstrip-command";
import {TokenCommand} from "./commands/token-command";
import {Command} from "./commands/command";
import {CreateColumnCommand} from "./commands/create-column-command";
import {DeleteColumnCommand} from "./commands/delete-column-command";
import {DeleteFlightstripCommand} from "./commands/delete-flightstrip-command";
import {EditFlightstripCommand} from "./commands/edit-flightstrip-command";
import {EditStatusCommand} from "./commands/edit-status-command";
import {GetClientsCommand} from "./commands/get-clients-command";
import {GetDataCommand} from "./commands/get-data-command";
import {MoveFlightstripCommand} from "./commands/move-flightstrip-command";


@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  // @ts-ignore
  private socket: WebSocket;

  isConnected: boolean = true;
  createdRoomId: string = "";
  multiplayerUrl = environment.multiplayerURL
  url = environment.websocketURL

  commands = new Map<string, Command>()

  constructor(private http: HttpClient,
              private snackService: SnackbarMessageService, private cookieService: CookieService,
              private tokenCommand: TokenCommand, private createColumnCommand: CreateColumnCommand,
              private createFlightstripCommand: CreateFlightstripCommand, private deleteColumnCommand: DeleteColumnCommand,
              private deleteFlightStripCommand: DeleteFlightstripCommand, private editFlightStripCommand: EditFlightstripCommand,
              private editStatusCommand: EditStatusCommand, private getClientsCommand: GetClientsCommand,
              private getDataCommand: GetDataCommand, private moveFlightstripCommand: MoveFlightstripCommand,
  ) {

    this.commands.set('token', tokenCommand)
    this.commands.set('create_column', createColumnCommand)
    this.commands.set('create_flightstrip', createFlightstripCommand)
    this.commands.set('delete_column', deleteColumnCommand)
    this.commands.set('delete_flightstrip', deleteFlightStripCommand)
    this.commands.set('edit_flightstrip', editFlightStripCommand)
    this.commands.set('edit_status', editStatusCommand)
    this.commands.set('get_clients', getClientsCommand)
    this.commands.set('get_data', getClientsCommand)
    this.commands.set('move_flightstrip', moveFlightstripCommand)
  }


  processMessage(data: any) {

    data = JSON.parse(data)

    let cmd = this.commands.get(data.cmd)

    if (cmd) {
      cmd.execute(data.args)
    } else {
      console.log(data.cmd + ' is not implemented')
    }


  }

  connect(roomId: string, password: string, name: string) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.sendMessage('connect', [roomId, password, name])
    };

    this.socket.onmessage = (event) => {
      // console.log(event.data)
      this.processMessage(event.data)
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    // this.websocketService.connect(roomId, password, name)

  }


  createRoom(password: string) {
    return this.http.post(`${this.multiplayerUrl}/room`, {password: password})
  }

  existsRoom(roomId: string) {
    return this.http.get(`${this.multiplayerUrl}/room/${roomId}`)
  }

  sendMessage(cmd: string, args: string[]): void {
    console.log(cmd, args)
    let msg = {cmd: cmd, args: args}
    console.log(JSON.stringify(msg))
    this.socket.send(JSON.stringify(msg));
  }
}
