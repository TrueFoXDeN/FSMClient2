import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FlightstripService {

  changedTriangleState = new Subject<void>();
  changedSquawk = new Subject<string>();

  constructor() {
  }
}
