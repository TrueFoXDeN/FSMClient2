import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

import {Subject} from "rxjs";

@Directive({
  selector: '[searchCallsignInput]'
})
export class SearchCallsignInputDirective implements OnInit, OnDestroy {

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSize();
    }));
  }

  ngOnInit(): void {
    this.updateStyle();
    this.updateSize();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateStyle() {
   this.elementRef.nativeElement.style.background= this.cS.style.appInput;
   this.elementRef.nativeElement.style.color = this.cS.style.fontColor;
    this.elementRef.nativeElement.style.width = `${190 * this.cS.multiplier}px`
    this.elementRef.nativeElement.style.lineHeight = `${36 * this.cS.multiplier}px`
  }

  updateSize(){
    this.elementRef.nativeElement.style.fontSize = `${14 * this.cS.multiplier}pt`
  }

}
