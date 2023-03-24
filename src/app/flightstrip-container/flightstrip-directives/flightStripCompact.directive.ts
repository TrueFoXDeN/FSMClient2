import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[flightStripCompact]'
})
export class FlightStripCompact implements OnInit {
  @Input("flightStripType") type!: stripType
  @Input("flightStripFontSize") fontSize: string = "medium"

  @Input("flightStripCompactDivider") divider: string = "none"


  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    })
  }

  ngOnInit(): void {
    this.updateStyle();
  }


  updateStyle() {
    switch (this.fontSize) {
      case "small":
        this.elementRef.nativeElement.style.fontSize = `${7 * this.cS.multiplier}pt`
        break;
      case "medium":
        this.elementRef.nativeElement.style.fontSize = `${11 * this.cS.multiplier}pt`
        break;
      case "large":
        this.elementRef.nativeElement.style.fontSize = `${18 * this.cS.multiplier}pt`
        break;
    }


    switch (this.type) {
      case stripType.INBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        switch (this.divider){
          case "none": break;
          case "right":
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorInbound}`;
            break;
        }
        break;
      case stripType.OUTBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundOutbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;

        switch (this.divider){
          case "none":  break;
          case "right":
            console.log(this.elementRef.nativeElement)
            console.log("test")
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorOutbound}`;
            break;
        }
        break;
      case stripType.VFR:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        switch (this.divider){
          case "none": break;
          case "right":
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorVfr}`;
            break;
        }
        break;
    }
  }


}
