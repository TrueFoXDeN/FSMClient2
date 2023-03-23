import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {
  dragDelay = 100;
  changedTriangleState = new Subject<void>();
  changedSquawk = new Subject<string>();
  dragFlightstrip = new Subject<boolean>()
  constructor() {
  }
}
