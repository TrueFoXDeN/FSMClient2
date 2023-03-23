import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StyleChangerService {
changedSize = new Subject<void>();
changedColors = new Subject<void>();
  constructor() {
  }


}
