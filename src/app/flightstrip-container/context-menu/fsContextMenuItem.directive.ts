import {Directive, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[fsContextMenuItem]'
})
export class FsContextMenuItemDirective implements OnInit {

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    });
    this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    });
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.background = this.cS.style.buttonHover;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.updateStyle();
  }

  ngOnInit(): void {
    this.updateStyle();
    this.updateSizes()
  }


  updateSizes() {
    this.elementRef.nativeElement.style.width = `100%`;
  }

  updateStyle() {
    this.elementRef.nativeElement.style.background = "transparent";
    this.elementRef.nativeElement.style.color = this.cS.style.fontColor
  }


}
