import {Directive, DoCheck, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../../flightstrip/flightstrip.model";

@Directive({
  selector: '[FlightStripContainer]'
})
export class FlightStripContainer implements OnInit, DoCheck {
  @Input("FlightStripContainer") type!: stripType

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
  }


}
