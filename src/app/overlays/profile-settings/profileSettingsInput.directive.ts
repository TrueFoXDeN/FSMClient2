import {Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[appProfileInput]'
})
export class ProfileSettingsInputDirective implements OnInit, OnDestroy {
  subscriptionList: any = []


  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
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
    this.elementRef.nativeElement.style.height = `${40 * this.cS.multiplier}px`;
    this.elementRef.nativeElement.style.fontSize = `${12 * this.cS.multiplier}pt`;
  }

  updateStyle() {
    this.elementRef.nativeElement.style.color = this.cS.style.fontColor;
    this.elementRef.nativeElement.style.background = this.cS.style.sidebarButton;
  }




}
