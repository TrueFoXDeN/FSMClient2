import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MultiplayerConnectionService} from "./multiplayer-connection.service";
import {SnackbarMessageService} from "./snackbar-message.service";
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  // @ts-ignore
  private socket: WebSocket;

  isConnected: boolean = false;
  createdRoomId: string = "";
  multiplayerUrl = environment.multiplayerURL
  url = environment.websocketURL
  roomId: string = ''

  isCreateDisabled: boolean = true;
  isJoinDisabled: boolean = true;
  isDisconnectDisabled: boolean = true;
  clients: string[] = [];

  multiplayerConnectionStatusChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient,
              private multiplayerConnectionService: MultiplayerConnectionService, private snackMessage: SnackbarMessageService,) {

  }


  connect(roomId: string, password: string, name: string) {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      // console.log([roomId, password, name]);
      this.sendMessage('connect', [roomId, password, name])
      this.roomId = roomId
      this.isConnected = true
      this.multiplayerConnectionStatusChanged.next(true);
    };

    this.socket.onmessage = (event) => {
      this.multiplayerConnectionService.message.next(event.data)
      // console.log('on message')
      // console.log(event.data)
    };

    this.socket.onclose = (event) => {
      // console.log('WebSocket connection closed:', event);
      this.snackMessage.showMessage("Connection closed", "info");
      this.isConnected = false
      this.multiplayerConnectionStatusChanged.next(false);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  }

  disconnect() {
    this.socket.close();
  }


  createRoom(password: string) {
    return this.http.post(`${this.multiplayerUrl}/room`, {password: password})
  }

  existsRoom(roomId: string) {
    return this.http.get(`${this.multiplayerUrl}/room/${roomId}`)
  }

  sendMessage(cmd: string, args: any[]): void {
    // console.log("Sending: ");
    // console.log(cmd, args)
    let msg = {cmd: cmd, args: args}
    // console.log(JSON.stringify(msg))
    this.socket.send(JSON.stringify(msg));
  }
}
