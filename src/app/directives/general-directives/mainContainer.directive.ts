import {Directive, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[mainContainer]'
})
export class MainContainer implements OnInit {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.elementRef.nativeElement.style.background = this.customStyles.style.appBackground
    })
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.appBackground
  }

}
