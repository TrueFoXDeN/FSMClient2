import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[fsContextMenu]'
})
export class FsContextMenuDirective implements OnInit {

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    });
    this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    });
  }

  ngOnInit(): void {
    this.updateStyle();
    this.updateSizes()
  }


  updateSizes() {
    this.elementRef.nativeElement.style.width = `${150 * this.cS.multiplier}px`;
  }

  updateStyle() {
    this.elementRef.nativeElement.style.background = this.cS.style.contextMenuBackground;
  }


}
