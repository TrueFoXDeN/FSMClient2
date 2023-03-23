import {Directive, DoCheck, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../../flightstrip-container/flightstrip/flightstrip.model";

@Directive({
  selector: '[flightStripContainer]'
})
export class FlightStripContainer implements OnInit, DoCheck {
  @Input("flightStripContainer") type!: stripType
  @Input("squawk") squawk: string = ""

  constructor(private elementRef: ElementRef, private cS: CustomStyles) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.updateStyle();
  }

  updateStyle() {
    this.elementRef.nativeElement.style.borderWidth = this.cS.style.fsBorderWidth;
    this.elementRef.nativeElement.style.borderStyle = this.cS.style.fsBorderStyle;

    switch (this.type) {
      case stripType.INBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundInbound;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        break;
      case stripType.OUTBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundOutbound;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorOutbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;
        break;
      case stripType.VFR:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundVfr;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        break;
    }

    if (this.squawk == "7500" || this.squawk == "7600" || this.squawk == "7700") {
      this.elementRef.nativeElement.style.borderColor = this.cS.style.fsEmergencyBorderColor;
    }
  }


}
