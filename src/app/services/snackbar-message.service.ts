import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class SnackbarMessageService {

  constructor(private messageService: MessageService) {
  }

  showMessage(message: string, severity: string) {
    this.messageService.add({severity: severity, detail: message});

  }
}
