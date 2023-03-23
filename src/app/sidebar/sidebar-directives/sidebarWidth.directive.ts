import {Directive, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[sidebarWidth]'
})
export class SidebarWidth implements OnInit {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedSize.subscribe(() => {
      this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
    })
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.width = `${60 * this.customStyles.multiplier}px`;
  }


}
