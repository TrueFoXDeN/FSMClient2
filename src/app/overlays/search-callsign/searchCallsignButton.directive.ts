import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

import {Subject} from "rxjs";

@Directive({
  selector: '[searchCallsignButton]'
})
export class SearchCallsignButtonDirective implements OnInit, OnDestroy {

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
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
   this.elementRef.nativeElement.style.background= this.cS.style.buttonAccent;
   this.elementRef.nativeElement.style.outlineColor = this.cS.style.buttonAccentOutline;
  }

}
