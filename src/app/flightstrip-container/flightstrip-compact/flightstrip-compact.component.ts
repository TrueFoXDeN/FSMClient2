import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Flightstrip, statusArrival, statusDeparture, statusVfr, stripType} from "../flightstrip/flightstrip.model";


@Component({
  selector: 'app-flightstrip-compact',
  templateUrl: './flightstrip-compact.component.html',
  styleUrls: ['./flightstrip-compact.component.scss']
})
export class FlightstripCompactComponent {
  @Input() fs!: Flightstrip;

  status: any;
  stripType = stripType;
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
  trimRoute(route: string): string {
    if (route === undefined || route === null) {
      return "";
    }

    let waypoints = route.split(" ")
    let charCount = 0

    waypoints.forEach((x)=>{
      charCount += x.length;
    })

    while (charCount > 25){
      charCount -= waypoints[Math.floor(waypoints.length/2)].length + 1

      let waypointsLeft = waypoints.slice(0,Math.floor(waypoints.length/2))
      let waypointsRight = waypoints.slice(Math.floor(waypoints.length/2+1),waypoints.length+1)
      waypoints = waypointsLeft.concat(waypointsRight)
    }

    let waypointsLeft = waypoints.slice(0,Math.floor(waypoints.length/2))
    let waypointsRight = waypoints.slice(Math.floor(waypoints.length/2+1),waypoints.length+1)

    waypoints = waypointsLeft.concat(["..."])
    waypoints = waypoints.concat(waypointsRight)

    return waypoints.join(" ")
  }
}
