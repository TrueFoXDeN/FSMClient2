import {Component, OnInit} from '@angular/core';
import {NetworkService, NetworkType} from "../../services/network.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackbarMessageService} from "../../services/snackbar-message.service";

@Component({
  selector: 'app-network-menu',
  templateUrl: './network-menu.component.html',
  styleUrls: ['./network-menu.component.scss']
})
export class NetworkMenuComponent implements OnInit {

  networkType = NetworkType
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
  ivaoLoading: boolean = false;
  vatsimLoading: boolean = false;
  posconLoading: boolean = false;

  constructor(private networkService: NetworkService, public dialogRef: MatDialogRef<NetworkMenuComponent>, private snackService: SnackbarMessageService) {
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
          break;
        case "vatsim":
          this.vatsimButtonText = this.connectedText;
          break;
        case "poscon":
          this.posconButtonText = this.connectedText;
          break;
      }
    }
    this.getNetworkCounts()
  }

  getNetworkCounts() {
    this.ivaoLoading = true;
    this.vatsimLoading = true;
    this.posconLoading = true;
    this.networkService.getIvaoOnlineCounter().subscribe({
      next: (response: any) => {
        this.ivaoControllers = response.controllerCount;
        this.ivaoPilots = response.pilotCount;
        if (!this.networkService.getIsNetworkFetchActive() || this.networkService.getCurrentNetworkEnum() == this.networkType.IVAO) {
          this.ivaoButtonEnabled = true;
        }

        this.ivaoLoading = false;
      },
      error: (err) => {
        this.snackService.showMessage(`Cannot connect to IVAO`, "error");
        this.ivaoLoading = false;
      }
    });
    this.networkService.getVatsimOnlineCounter().subscribe({
      next: (response: any) => {
        this.vatsimControllers = response.controllerCount;
        this.vatsimPilots = response.pilotCount;
        if (!this.networkService.getIsNetworkFetchActive() || this.networkService.getCurrentNetworkEnum() == this.networkType.VATSIM) {
          this.vatsimButtonEnabled = true;
        }
        this.vatsimLoading = false;
      },
      error: (err) => {
        this.snackService.showMessage(`Cannot connect to VATSIM`, "error");
        this.vatsimLoading = false;
      }
    });
    this.networkService.getPosconOnlineCounter().subscribe({
      next: (response: any) => {
        this.posconControllers = response.controllerCount
        this.posconPilots = response.pilotCount
        if (!this.networkService.getIsNetworkFetchActive() || this.networkService.getCurrentNetworkEnum() == this.networkType.POSCON) {
          this.posconButtonEnabled = true;
        }
        this.posconLoading = false
      },
      error: (err) => {
        this.snackService.showMessage(`Cannot connect to POSCON`, "error");
        this.posconLoading = false;
      }
    });
  }

  changeAllButtons(state: boolean) {
    this.ivaoButtonEnabled = state;
    this.vatsimButtonEnabled = state;
    this.posconButtonEnabled = state;
  }
}
