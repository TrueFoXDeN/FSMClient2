import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../customStyles";

@Directive({
  selector: '[appMaxHeight]'
})
export class MaxHeightDirective implements OnInit {
  @Input() maxHeight = 0;
  constructor(private elementRef: ElementRef, private customStyles : CustomStyles) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.maxHeight = this.customStyles.style.fsBackgroundOutbound
  }

}
