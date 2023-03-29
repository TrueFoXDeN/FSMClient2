import {Injectable} from '@angular/core';
import {interval, Subject} from "rxjs";
import {SnackbarMessageService} from "./snackbar-message.service";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isNetworkFetchActive = false;
  private usedNetwork = networkType.VATSIM
  private fiveSecInterval = interval(5000);
  networkEmitter = new Subject<void>()

  changedNetworkEmitter = new Subject<any>()

  constructor(private messageService : SnackbarMessageService) {
    this.fiveSecInterval.subscribe(() => {
      if (this.isNetworkFetchActive) {
        this.networkEmitter.next();
      }
    });
  }


  startNetworkConnection() {
    this.isNetworkFetchActive = true;
    this.changedNetworkEmitter.next({active: true, network: this.usedNetwork})
    this.messageService.showMessage(`Network connected: ${networkType[this.usedNetwork]}`, "success")
  }

  stopNetworkConnection() {
    this.isNetworkFetchActive = false;
    this.changedNetworkEmitter.next({active: false, network: this.usedNetwork})
    this.messageService.showMessage("Network disconnected", "warning")
  }

  getIsNetworkFetchActive() {
    return this.isNetworkFetchActive;
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
    this.changedNetworkEmitter.next({active: this.isNetworkFetchActive, network: this.usedNetwork})
  }

}

export enum networkType {
  IVAO,
  VATSIM,
  POSCON
}
