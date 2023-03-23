import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[flightstripIcon]'
})
export class FlightstripIcon implements OnInit {
  @Input("iconState") iconState: string = "standard"

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
  }

  ngOnInit(): void {
    switch (this.iconState) {
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
