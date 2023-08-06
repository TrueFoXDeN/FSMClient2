import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";

@Directive({
  selector: '[proximitySettings]'
})
export class ProximitySettingsDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  @Input("header") isHeader = false;

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    }));
  }

  ngOnInit(): void {
    this.updateStyle();
    this.updateSizes();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSizes() {
    if (this.isHeader) {
      this.elementRef.nativeElement.style.fontSize = `${20 * this.cS.multiplier}pt`;
    }else{
      this.elementRef.nativeElement.style.fontSize = `${12 * this.cS.multiplier}pt`;
    }
  }

  updateStyle() {
    this.elementRef.nativeElement.style.color = this.cS.style.fontColor;
    this.elementRef.nativeElement.style.background = this.cS.style.appBackground;

  }


}
