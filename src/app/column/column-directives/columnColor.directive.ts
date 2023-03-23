import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";

@Directive({
  selector: '[columnColor]'
})
export class ColumnColor implements OnInit {
  @Input("iconState") iconState: string = "standard"

  constructor(private elementRef: ElementRef, private customStyles: CustomStyles, private styleChanger: StyleChangerService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.elementRef.nativeElement.style.background = this.customStyles.style.columnBackground
      this.elementRef.nativeElement.style.color = this.customStyles.style.fontColor
    });
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.background = this.customStyles.style.columnBackground
    this.elementRef.nativeElement.style.color = this.customStyles.style.fontColor
  }

}
