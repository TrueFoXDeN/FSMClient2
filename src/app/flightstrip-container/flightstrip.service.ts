import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 100;
  isInputFocused: boolean = false;
  changedTriangleState = new Subject<void>();

  dragFlightstrip = new Subject<boolean>()

  constructor() {
  }
}
