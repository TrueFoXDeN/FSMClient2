import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {iconState} from "../flightstrip.model";
import {Subject} from "rxjs";

@Directive({
  selector: '[flightstripIcon]'
})
export class FlightstripIcon implements OnInit, OnDestroy {
  @Input("iconState") iconState: iconState = iconState.INACTIVE
  private internalState: iconState = iconState.INACTIVE
  private squawk: string = ""

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.setStyle();
    }));
    this.subscriptionList.push(this.fsService.changedTriangleState.subscribe(() => {
      this.setStyle();
    }));

  }

  onSquawkChange(squawk: string) {
    this.squawk = squawk;
    this.setStyle()
  }

  ngOnInit(): void {
    this.setStyle()
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  setStyle() {
    if (this.squawk == "7500" || this.squawk == "7600" || this.squawk == "7700") {
      this.internalState = iconState.ERROR;
    } else {
      this.internalState = this.iconState
    }
    switch (this.internalState) {
      case iconState.INACTIVE:
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorInactive
        break;
      case iconState.STANDARD:
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColor
        break;
      case iconState.WARNING:
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorWarning
        break;
      case iconState.SUCCESS:
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorSuccess
        break;
      case iconState.ERROR:
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorError
        break;
    }
  }
}
