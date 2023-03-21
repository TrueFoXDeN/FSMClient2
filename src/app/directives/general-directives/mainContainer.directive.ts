import {Directive, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";

@Directive({
  selector: '[mainContainer]'
})
export class MainContainer implements OnInit {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles) {

  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.appBackground
  }

}
