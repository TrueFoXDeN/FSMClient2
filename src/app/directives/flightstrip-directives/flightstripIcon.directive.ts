import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {iconState} from "../../flightstrip-container/flightstrip.model";

@Directive({
  selector: '[flightstripIcon]'
})
export class FlightstripIcon implements OnInit {
  @Input("iconState") iconState: iconState = iconState.INACTIVE
  @Input("squawk") squawk: string = ""

  internalState: iconState = iconState.INACTIVE

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.setStyle();
    });
    this.fsService.changedTriangleState.subscribe(() => {
      this.setStyle();
    });
  }

  ngOnInit(): void {
    this.setStyle()
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
