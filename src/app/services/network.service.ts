import {Injectable} from '@angular/core';
import {interval, Subject} from "rxjs";
import {SnackbarMessageService} from "./snackbar-message.service";
import {ProximityService} from "../overlays/proximity-settings/proximity.service";
import {DataService} from "./data.service";
import {Airport} from "../overlays/proximity-settings/proximity.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isNetworkFetchActive = false;
  private usedNetwork = NetworkType.VATSIM
  private networkFetchInterval = interval(2000);
  private proximityFetchInterval = interval(5000)
  networkEmitter = new Subject<void>()
  errorTriggered = false;
  errorCount: number = 0
  networkState = "default"
  changedNetworkEmitter = new Subject<any>()
  baseURL = environment.baseURL


  constructor(private messageService: SnackbarMessageService, private proximityService: ProximityService, private dataService: DataService, private http: HttpClient) {
    this.networkFetchInterval.subscribe(() => {
      if (this.isNetworkFetchActive) {
        this.networkEmitter.next();
      }
    });
    this.proximityFetchInterval.subscribe(() => {
      if (this.isNetworkFetchActive) {
        let airports: Airport[] = []
        this.dataService.profileData[this.dataService.currentProfileID].proximity.forEach((val: any) => airports.push(Object.assign({}, val)));
        this.proximityService.getAircraftsInProximity(this.usedNetwork, airports).subscribe({
          next: (res: any) => {
            this.proximityService.updateProximity(res, airports)
            this.triggerErrorCleared()
          },
          error: (err) => {
            this.errorCount ++
            if(this.errorCount > 2){
              this.triggerError()
            }


          }
        })
      }
    });

  }


  startNetworkConnection() {
    this.isNetworkFetchActive = true;
    this.changedNetworkEmitter.next({active: true, network: this.usedNetwork})
    this.messageService.showMessage(`Network connected: ${NetworkType[this.usedNetwork]}`, "success")
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

  getVatsimOnlineCounter() {
    return this.http.get(`${this.baseURL}/vatsim/connections`)
  }

  getIvaoOnlineCounter() {
    return this.http.get(`${this.baseURL}/ivao/connections`)
  }

  getPosconOnlineCounter() {
    return this.http.get(`${this.baseURL}/poscon/connections`)
  }

  getNetwork() {
    switch (this.usedNetwork) {
      case NetworkType.VATSIM:
        return "vatsim";
      case NetworkType.POSCON:
        return "poscon";
      case NetworkType.IVAO:
        return "ivao"
    }
  }

  getCurrentNetworkEnum() {
    return this.usedNetwork
  }


  setNetwork(network: NetworkType) {
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

  triggerErrorCleared(){
    this.errorCount = 0
    this.errorTriggered = false
    this.networkState = "success"
  }

  getErrorState() {
    return this.errorTriggered
  }


}

export enum NetworkType {
  IVAO,
  VATSIM,
  POSCON
}
