import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[sidebarButton]'
})
export class SidebarButton implements OnInit, OnDestroy {
  @Input("iconState") iconState: string = "standard"
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
  }

  ngOnInit(): void {
    this.updateStyle()
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateStyle() {
    this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarButton
    switch (this.iconState) {
      case "standard":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColor
        break;
      case "success":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorSuccess
        break;
      case "error":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorError
        break;

    }
  }
}
