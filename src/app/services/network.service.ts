import {Injectable} from '@angular/core';
import {interval, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isNetworkFetchActive = true;
  private usedNetwork = networkType.IVAO
  private oneSecNetworkInterval = interval(1000);
  oneSecNetworkEmitter = new Subject<void>()


  constructor() {
    this.oneSecNetworkInterval.subscribe(() => {
      if (this.isNetworkFetchActive) {
        this.oneSecNetworkEmitter.next();
      }
    });
  }

  getNetwork() {
    switch (this.usedNetwork) {
      case networkType.VATSIM:
        return "vastsim";
      case networkType.POSCON:
        return "poscon";
      case networkType.IVAO:
        return "ivao"
    }
  }

}

export enum networkType {
  IVAO,
  VATSIM,
  POSCON
}
