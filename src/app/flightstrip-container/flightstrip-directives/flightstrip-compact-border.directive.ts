import {Directive, ElementRef, Input, OnDestroy} from '@angular/core';
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Flightstrip, stripType} from "../flightstrip.model";

@Directive({
  selector: '[appFlightstripCompactBorder]'
})
export class FlightstripCompactBorderDirective implements OnDestroy {
  @Input("appFlightstripCompactBorder") fs!: Flightstrip
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));

    this.subscriptionList.push(this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.updateStyle();
      }
    }));

    this.subscriptionList.push(this.fsService.searchFlightstrip.subscribe(() => {
      if (this.fs.isMarkedBySearch) {
        this.highlightStrip();
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

  wait(ms: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
  }

  highlightStrip() {
    let speed = 500;
    this.wait(speed)
      .then(() => {
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsHighlight;
        return this.wait(speed)
      })
      .then(() => {
        this.updateStyle();
        return this.wait(speed)
      })
      .then(() => {
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsHighlight;
        return this.wait(speed)
      })
      .then(() => {
        this.updateStyle();
        return this.wait(speed)
      })
      .then(() => {
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsHighlight;
        return this.wait(speed)
      })
      .then(() => {
        this.updateStyle();
        return this.wait(speed)
      })

    this.fs.isMarkedBySearch = false;
  }


  updateStyle() {
    this.elementRef.nativeElement.style.borderWidth = "2px";
    this.elementRef.nativeElement.style.borderStyle = "solid";
    switch (this.fs.type) {
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
    if (this.fs.squawk == "7500" || this.fs.squawk == "7600" || this.fs.squawk == "7700") {
      this.elementRef.nativeElement.style.borderColor = this.cS.style.fsEmergencyBorderColor;
    }
  }
}
