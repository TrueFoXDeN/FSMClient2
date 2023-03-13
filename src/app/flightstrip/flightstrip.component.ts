import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from './flightstrip.model';


@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['../../app-theme.scss', './flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit, AfterViewInit {

  @Input() fs!: Flightstrip;
  status: any;
  stripType = stripType;

  constructor() {

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


}
