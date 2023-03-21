import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[columnButtonColor]'
})
export class ColumnButtonColor implements OnInit {
  @Input("iconState") iconState: string = "standard"

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.columnButtonBackground
    this.elementRef.nativeElement.style.color = this.customStyles.style.columnButtonFontColor
  }

}
