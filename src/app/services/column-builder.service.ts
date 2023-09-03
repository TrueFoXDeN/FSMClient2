import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnBuilderService {

  columnConfigChanged : Subject<void> = new Subject<void>()
  constructor() { }
}
