import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from './flightstrip.model';
import {Data} from "../../data";
import {findIndex} from "rxjs";


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['./flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() fs!: Flightstrip;
  status: any;
  stripType = stripType;

  constructor(private globalData: Data) {

  }

  ngOnInit() {
    switch (this.fs.type) {
      case stripType.OUTBOUND:
        this.status = statusDeparture
        break;
      case stripType.INBOUND:
        this.status = statusArrival
        break;
      case stripType.VFR:
        this.status = statusVfr
        break;
    }
  }


  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getSquawkState() {
    if (this.fs.squawk == "7500") {
      return "error";
    } else {
      return "inactive"
    }
  }


  onFocusOut() {
    // Zur Zeit nicht relevant
    console.log("Change detected")
    let flightstripArray = this.globalData.flightstripData?.[this.fs.columnId].flightstrips
    let indexOfStrip = -1
    for (let flightstrip of flightstripArray) {
      if (flightstrip.id == this.fs.id) {
        console.log("Flightstrip found")
        indexOfStrip = flightstripArray.indexOf(flightstrip);
        break;
      }
    }
    if (indexOfStrip != -1) {
      console.log(this.fs)
      this.globalData.flightstripData[this.fs.columnId].flightstrips[indexOfStrip] = this.fs;
    }
  }

}
