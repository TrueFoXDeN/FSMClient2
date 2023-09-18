import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {WebsocketService} from "./websocket.service";
import {HttpClient} from "@angular/common/http";




@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  isConnected: boolean = true;
  multiplayerUrl = environment.multiplayerURL

  constructor(private websocketService: WebsocketService, private http: HttpClient) { }

  connect(){
    this.websocketService.connect()
    this.isConnected = true;

  }


  createRoom(password: string) {
    // console.log(password)
    return this.http.post(`${this.multiplayerUrl}/room`, {password: password})
  }
}
