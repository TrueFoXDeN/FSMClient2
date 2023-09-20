import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {SnackbarMessageService} from "./snackbar-message.service";
import {CookieService} from "ngx-cookie-service";


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

  constructor(private http: HttpClient,
              private snackService: SnackbarMessageService, private cookieService: CookieService) {
  }


  processMessage(data: any) {
    data = JSON.parse(data)
    switch (data.cmd) {
      case "token":
        this.snackService.showMessage(`Connected to Multiplayer`, "success");
        this.cookieService.set('multiplayerAuth', data.args[0])
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
