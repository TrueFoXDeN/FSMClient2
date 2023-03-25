import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[flightStrip]'
})
export class FlightStripContainer implements OnInit {
  @Input("flightStrip") type!: stripType
  squawk: string = ""

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    });
  }

  onSquawkChange(squawk: string) {
    this.squawk = squawk;
    this.updateStyle();
  }

  ngOnInit(): void {
    this.updateStyle();
  }

  updateStyle() {
    this.elementRef.nativeElement.style.borderWidth = "2px";
    this.elementRef.nativeElement.style.borderStyle = "solid";
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

  markForDeleteOperation(){
    this.elementRef.nativeElement.style.borderColor = this.cS.style.fsDelete
  }


}
