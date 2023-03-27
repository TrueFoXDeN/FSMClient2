import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[sidebar]'
})
export class Sidebar implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(
      this.styleChanger.changedColors.subscribe(() => {
        this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarBackground
      }));
    this.subscriptionList.push(
      this.styleChanger.changedSize.subscribe(() => {
        console.log(this.elementRef.nativeElement.style.width);
        this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
        console.log(this.elementRef.nativeElement.style.width);
      }));
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarBackground
    this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

}
