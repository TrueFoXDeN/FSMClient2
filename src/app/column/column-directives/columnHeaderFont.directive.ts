import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnHeaderFont]'
})
export class ColumnHeaderFont implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.elementRef.nativeElement.style.fontSize = `${20 * this.customStyles.multiplier}pt`;
    }));
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.fontSize = `${20 * this.customStyles.multiplier}pt`;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }
}
