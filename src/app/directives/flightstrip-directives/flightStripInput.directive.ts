import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../../flightstrip-container/flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[flightStripInput]'
})
export class FlightStripInput implements OnInit {
  @Input("flightStripInput") type!: stripType

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle()
    });
    this.styleChanger.changedSize.subscribe(() => {
      this.updateStyle();
    });
  }

  ngOnInit(): void {
    this.updateStyle();
  }


  updateStyle() {
    this.elementRef.nativeElement.style.fontSize = `${10 * this.cS.multiplier}pt`
    switch (this.type) {
      case stripType.INBOUND:
        //this.elementRef.nativeElement.setAttribute("placeholder", "color").color = this.cS.style.fsTextColorPlaceholderInbound;
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorInbound
        break;
      case stripType.OUTBOUND:
        //this.elementRef.nativeElement.style.placeholder.color = this.cS.style.fsTextColorPlaceholderOutbound;
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundOutbound
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorOutbound
        break;
      case stripType.VFR:
        //this.elementRef.nativeElement.placeholder.color = this.cS.style.fsTextColorPlaceholderVfr;
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorVfr
        break;
    }
  }


}
