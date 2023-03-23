import {Directive, DoCheck, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[flightstripIcon]'
})
export class FlightstripIcon implements OnInit, DoCheck {
  @Input("iconState") iconState: string = "inactive"
  @Input("squawk") squawk: string = ""

  internalState: string = ""

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
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

  ngDoCheck(): void {
    this.setStyle()
  }


}
