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
  errorTriggered = false;
  networkState = "default"
  changedNetworkEmitter = new Subject<any>()

  constructor(private messageService: SnackbarMessageService) {
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
    this.networkState = "success"
  }

  stopNetworkConnection() {
    this.isNetworkFetchActive = false;
    this.changedNetworkEmitter.next({active: false, network: this.usedNetwork})
    this.messageService.showMessage("Network disconnected", "warning")
    this.networkState = "default"
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
    this.errorTriggered = false
  }

  triggerError() {
    if (!this.errorTriggered) {
      this.messageService.showMessage("Failed to fetch network data", "error")
      this.errorTriggered = true
      this.networkState = "error"
    }
  }

  getErrorState() {
    return this.errorTriggered
  }
}

export enum networkType {
  IVAO,
  VATSIM,
  POSCON
}
