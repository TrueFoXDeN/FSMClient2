import {Injectable} from '@angular/core';
import {interval, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isNetworkFetchActive = true;
  private usedNetwork = networkType.VATSIM
  private oneSecInterval = interval(1000);
  networkEmitter = new Subject<void>()


  constructor() {
    this.oneSecInterval.subscribe(() => {
      if (this.isNetworkFetchActive) {
        this.networkEmitter.next();
      }
    });
  }

  getNetwork() {
    switch (this.usedNetwork) {
      case networkType.VATSIM:
        return "vatsim";
      case networkType.POSCON:
        return "poscon";
      case networkType.IVAO:
        return "ivao"
    }
  }

  setNetwork(network: networkType) {
    this.usedNetwork = network;
  }

}

export enum networkType {
  IVAO,
  VATSIM,
  POSCON
}
