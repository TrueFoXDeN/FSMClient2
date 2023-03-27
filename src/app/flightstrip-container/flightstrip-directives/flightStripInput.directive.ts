import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {Flightstrip, stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";

@Directive({
  selector: '[flightStripInput]'
})
export class FlightStripInput implements OnInit, OnDestroy {
  @Input("flightStripInput") fs!: Flightstrip

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle()
    }));
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateStyle();
    }));

    this.subscriptionList.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.updateStyle();
      }
    }));
  }

  ngOnInit(): void {
    this.updateStyle();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  updateStyle() {
    this.elementRef.nativeElement.style.fontSize = `${10 * this.cS.multiplier}pt`
    switch (this.fs.type) {
      case stripType.INBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorInbound
        break;
      case stripType.OUTBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundOutbound
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorOutbound
        break;
      case stripType.VFR:
        this.elementRef.nativeElement.style.background = this.cS.style.fsTextboxBackgroundVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        this.elementRef.nativeElement.style.outlineColor = this.cS.style.fsTextboxBorderColorVfr
        break;
    }
  }


}
