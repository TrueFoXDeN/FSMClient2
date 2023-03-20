import {Directive, DoCheck, ElementRef, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[sidebarWidth]'
})
export class SidebarWidth implements OnInit, OnChanges, DoCheck {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
  }

  ngDoCheck(): void {
    this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
  }


}
