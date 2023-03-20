import {Directive, DoCheck, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[columnHeaderFont]'
})
export class ColumnHeaderFont implements OnInit, DoCheck {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.fontSize = `${20 * this.customStyles.multiplier}pt`;
  }

  ngDoCheck(): void {
    this.elementRef.nativeElement.style.fontSize = `${20 * this.customStyles.multiplier}pt`;
  }


}
