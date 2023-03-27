import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnBuilderFooter]'
})
export class ColumnBuilderFooterDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarBackground
    }));

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarBackground
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

}
