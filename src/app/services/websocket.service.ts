import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // @ts-ignore
  private socket: WebSocket;
  url = environment.websocketURL

  constructor() { }

  connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      this.sendMessage('connect',['abcde','test','Laurenz'])
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(cmd:string, args: string[]): void {
    let msg = {cmd: cmd, args: args}
    this.socket.send(JSON.stringify(msg));
  }

  closeConnection(): void {
    this.socket.close();
  }
}
