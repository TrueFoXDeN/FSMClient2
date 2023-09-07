import {Component, OnInit} from '@angular/core';
import {NetworkService, NetworkType} from "../../services/network.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-network-menu',
  templateUrl: './network-menu.component.html',
  styleUrls: ['./network-menu.component.scss']
})
export class NetworkMenuComponent implements OnInit {

  connectedText = "Disconnect"
  notConnectedText = "Connect"
  vatsimButtonText = ""
  ivaoButtonText = ""
  posconButtonText = ""
  ivaoButtonEnabled = false;
  vatsimButtonEnabled = false;
  posconButtonEnabled = false;
  ivaoPilots = "0"
  ivaoControllers = "0"
  vatsimPilots = "0"
  vatsimControllers = "0"
  posconPilots = "0"
  posconControllers = "0"

  constructor(private networkService: NetworkService, public dialogRef: MatDialogRef<NetworkMenuComponent>) {
  }

  changeNetworkConnection(network: string) {
    if (!this.networkService.getIsNetworkFetchActive()) {
      switch (network) {
        case "ivao":
          this.networkService.setNetwork(NetworkType.IVAO);
          this.dialogRef.close()
          break;
        case "vatsim":
          this.networkService.setNetwork(NetworkType.VATSIM);
          this.dialogRef.close()
          break;
        case "poscon":
          this.networkService.setNetwork(NetworkType.POSCON);
          this.dialogRef.close()
          break;
      }
      this.networkService.startNetworkConnection();
    } else {
      this.networkService.stopNetworkConnection();
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.vatsimButtonText = this.notConnectedText;
    this.ivaoButtonText = this.notConnectedText;
    this.posconButtonText = this.notConnectedText;

    if (this.networkService.getIsNetworkFetchActive()) {
      this.changeAllButtons(false);
      switch (this.networkService.getNetwork()) {
        case "ivao":
          this.ivaoButtonText = this.connectedText;
          this.ivaoButtonEnabled = true;
          break;
        case "vatsim":
          this.vatsimButtonEnabled = true;
          this.vatsimButtonText = this.connectedText;
          break;
        case "poscon":
          this.posconButtonEnabled = true;
          this.posconButtonText = this.connectedText;
          break;
      }
    } else {
      this.changeAllButtons(true);
    }
    this.getNetworkCounts()
  }

  getNetworkCounts(){
    this.networkService.getIvaoOnlineCounter().subscribe({
      next: (response: any) => {
        this.ivaoControllers = response.controllerCount
        this.ivaoPilots = response.pilotCount
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.networkService.getVatsimOnlineCounter().subscribe({
      next: (response: any) => {
        this.vatsimControllers = response.controllerCount
        this.vatsimPilots = response.pilotCount
      },
      error: (err) => {
        console.log(err)
      }
    });
    this.networkService.getPosconOnlineCounter().subscribe({
      next: (response: any) => {
        this.posconControllers = response.controllerCount
        this.posconPilots = response.pilotCount
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  changeAllButtons(state: boolean) {
    this.ivaoButtonEnabled = state;
    this.vatsimButtonEnabled = state;
    this.posconButtonEnabled = state;
  }
}
