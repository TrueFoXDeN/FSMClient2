import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {Flightstrip, stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";

@Directive({
  selector: '[flightStripCompact]'
})
export class FlightStripCompact implements OnInit, OnDestroy {
  @Input("fsCompact") fs!: Flightstrip
  @Input("flightStripFontSize") fontSize: string = "medium"

  @Input("flightStripCompactDivider") divider: string = "none"
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateStyle()
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


    switch (this.fs.type) {
      case stripType.INBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        switch (this.divider) {
          case "none":
            break;
          case "right":
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorInbound}`;
            break;
        }
        break;
      case stripType.OUTBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundOutbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;

        switch (this.divider) {
          case "none":
            break;
          case "right":
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorOutbound}`;
            break;
        }
        break;
      case stripType.VFR:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        switch (this.divider) {
          case "none":
            break;
          case "right":
            this.elementRef.nativeElement.style.borderRight = `1px solid ${this.cS.style.fsDividerColorVfr}`;
            break;
        }
        break;
    }
  }

  markForDeleteOperation() {
    this.elementRef.nativeElement.style.borderColor = this.cS.style.fsDelete
  }


}
