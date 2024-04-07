import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MultiplayerConnectionService {

  message = new Subject<any>();

  constructor() {
  }
}
