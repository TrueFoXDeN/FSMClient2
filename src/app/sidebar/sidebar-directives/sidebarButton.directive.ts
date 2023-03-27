import {Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {iconState} from "../../flightstrip-container/flightstrip.model";
import {NetworkService} from "../../services/network.service";

@Directive({
  selector: '[sidebarButton]'
})
export class SidebarButton implements OnInit, OnDestroy, OnChanges {
  @Input("iconState") iconState: any = "standard"
  subscriptionList: any = []
  internalIconState = "standard";

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService,
              private networkService: NetworkService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
  }

  ngOnInit(): void {
    this.internalIconState = this.iconState;
    this.updateStyle()
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateStyle() {
    this.elementRef.nativeElement.style.background = this.customStyles.style.sidebarButton
    switch (this.internalIconState) {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["iconState"]) {
      this.internalIconState = this.iconState
      this.updateStyle()
    }
  }
}
