import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {stripType} from "./flightstrip.model";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 100;
  isInputFocused: boolean = false;
  changedTriangleState = new Subject<void>();

  dragFlightstrip = new Subject<boolean>()
  changedType = new Subject<{type : stripType, id : string}>()
  dragChange = new Subject<{ id : string, dragEnabled : boolean }>()


  constructor() {
  }
}
