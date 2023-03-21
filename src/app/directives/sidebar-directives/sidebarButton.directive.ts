import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[sidebarButton]'
})
export class SidebarButton implements OnInit {
  @Input("iconState") iconState: string = "standard"

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {

  }

  ngOnInit(): void {
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
