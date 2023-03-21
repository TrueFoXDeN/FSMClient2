import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[appInput]'
})
export class AppInput implements OnInit {
  @Input("iconState") iconState: string = "standard"

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.appInput
    this.elementRef.nativeElement.style.color = this.customStyles.style.fontColor
  }

}
