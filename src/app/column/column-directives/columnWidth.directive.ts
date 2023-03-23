import {Directive, ElementRef, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnWidth]'
})
export class ColumnWidth implements OnInit {
  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger : StyleChangerService) {
    this.styleChanger.changedSize.subscribe(()=>{
      this.elementRef.nativeElement.style.width = `${450 * this.customStyles.multiplier}px`;
    });
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.width = `${450 * this.customStyles.multiplier}px`;
  }


}
