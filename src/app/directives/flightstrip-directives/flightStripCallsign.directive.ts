import {Directive, DoCheck, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../../flightstrip-container/flightstrip/flightstrip.model";

@Directive({
  selector: '[callsign]'
})
export class FlightStripCallsign implements OnInit, DoCheck {

  constructor(private elementRef: ElementRef, private cS: CustomStyles) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.updateStyle();
  }

  updateStyle() {
    this.elementRef.nativeElement.style.fontSize = `${14 * this.cS.multiplier}pt`;

  }


}
