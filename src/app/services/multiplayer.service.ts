import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackbarMessageService} from "./snackbar-message.service";
import {CookieService} from "ngx-cookie-service";
import {CreateFlightstripReceiveCommand} from "./commands-receive/create-flightstrip-receive-command";
import {TokenReceiveCommand} from "./commands-receive/token-receive-command";
import {CommandReceive} from "./commands-receive/command-receive";
import {CreateColumnReceiveCommand} from "./commands-receive/create-column-receive-command";
import {DeleteColumnReceiveCommand} from "./commands-receive/delete-column-receive-command";
import {DeleteFlightstripReceiveCommand} from "./commands-receive/delete-flightstrip-receive-command";
import {EditFlightstripReceiveCommand} from "./commands-receive/edit-flightstrip-receive-command";
import {GetClientsReceiveCommand} from "./commands-receive/get-clients-receive-command";
import {GetDataReceiveCommand} from "./commands-receive/get-data-receive-command";
import {MoveFlightstripReceiveCommand} from "./commands-receive/move-flightstrip-receive-command";
import {MultiplayerReceiveService} from "./multiplayer-receive.service";


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
  roomId: string = ''


  constructor(private http: HttpClient, private multiplayerReceiveService: MultiplayerReceiveService) {

  }


  connect(roomId: string, password: string, name: string) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.sendMessage('connect', [roomId, password, name])
      this.roomId = roomId
    };

    this.socket.onmessage = (event) => {
      this.multiplayerReceiveService.processMessage(event.data)
      console.log(event.data)
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  }


  createRoom(password: string) {
    return this.http.post(`${this.multiplayerUrl}/room`, {password: password})
  }

  existsRoom(roomId: string) {
    return this.http.get(`${this.multiplayerUrl}/room/${roomId}`)
  }

  sendMessage(cmd: string, args: any[]): void {
    console.log(cmd, args)
    let msg = {cmd: cmd, args: args}
    console.log(JSON.stringify(msg))
    this.socket.send(JSON.stringify(msg));
  }
}
