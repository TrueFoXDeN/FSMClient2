import {Directive, DoCheck, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[columnHeaderHeight]'
})
export class ColumnHeaderHeight implements OnInit, DoCheck {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.height = `${70 * this.customStyles.multiplier}px`;
  }

  ngDoCheck(): void {
    this.elementRef.nativeElement.style.height = `${70 * this.customStyles.multiplier}px`;
  }


}
