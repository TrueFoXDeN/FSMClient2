import {Directive, DoCheck, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[columnWidth]'
})
export class ColumnWidth implements OnInit, DoCheck {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.width = `${400 * this.customStyles.multiplier}px`;
  }

  ngDoCheck(): void {
    this.elementRef.nativeElement.style.width = `${400 * this.customStyles.multiplier}px`;
  }


}
