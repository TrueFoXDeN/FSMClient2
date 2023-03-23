import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[flightstripIcon]'
})
export class FlightstripIcon implements OnInit {
  @Input("iconState") iconState: string = "inactive"
  @Input("squawk") squawk: string = ""

  internalState: string = ""

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.setStyle();
    });
  }

  ngOnInit(): void {
    this.setStyle()
  }

  setStyle() {
    if (this.squawk == "7500" || this.squawk == "7600" || this.squawk == "7700") {
      this.internalState = "error";
    } else {
      this.internalState = this.iconState
    }
    switch (this.internalState) {
      case "inactive":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorInactive
        break;
      case "standard":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColor
        break;
      case "warning":
        this.elementRef.nativeElement.style.color = this.customStyles.style.iconColorWarning
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
