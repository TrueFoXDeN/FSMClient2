import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnHeaderHeight]'
})
export class ColumnHeaderHeight implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.elementRef.nativeElement.style.height = `${70 * this.customStyles.multiplier}px`;
    }));
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.height = `${70 * this.customStyles.multiplier}px`;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }
}
