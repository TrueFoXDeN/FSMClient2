import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

import {Subject} from "rxjs";

@Directive({
  selector: '[searchCallsign]'
})
export class SearchCallsignDirective implements OnInit, OnDestroy {

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSize();
    }));
  }
  ngOnInit(): void {
    this.updateSize();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSize() {
    this.elementRef.nativeElement.style.fontSize = `${18 * this.styleChanger.multiplier}pt`
  }

}
