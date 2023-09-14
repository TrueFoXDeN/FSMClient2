import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../customStyles";
import {StyleChangerService} from "../services/style-changer.service";
import {FlightstripService} from "../flightstrip-container/flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[appDropdownItem]'
})
export class GeneralDropdownItemDirective implements OnInit, OnDestroy {
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
    this.elementRef.nativeElement.style.lineHeight = `${40 * this.styleChanger.multiplier}px`;
    this.elementRef.nativeElement.style.fontSize = `${11 * this.styleChanger.multiplier}pt`;
  }

  updateStyle() {
    this.elementRef.nativeElement.style.color = this.cS.style.fontColor;
    this.elementRef.nativeElement.style.background = this.cS.style.sidebarButton;
    this.elementRef.nativeElement.style.borderColor = this.cS.style.borderColor
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.background = this.cS.style.buttonHover;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.background = this.cS.style.sidebarButton;
  }


}
