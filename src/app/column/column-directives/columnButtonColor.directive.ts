import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnButtonColor]'
})
export class ColumnButtonColor implements OnInit, OnDestroy {
  @Input("iconState") iconState: string = "standard"
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.elementRef.nativeElement.style.background = this.customStyles.style.columnButtonBackground
      this.elementRef.nativeElement.style.color = this.customStyles.style.columnButtonFontColor
    }));

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.columnButtonBackground
    this.elementRef.nativeElement.style.color = this.customStyles.style.columnButtonFontColor
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

}
