import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StyleChangerService {
  multiplier = 1.0;
  changedSize = new Subject<void>();
  changedColors = new Subject<void>();
  constructor() {
  }


}
