import {Directive, ElementRef, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[fsContextMenu]'
})
export class FsContextMenuDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    }));
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    }));
  }

  ngOnInit(): void {
    this.updateStyle();
    this.updateSizes()
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSizes() {
    this.elementRef.nativeElement.style.width = `${155 * this.cS.multiplier}px`;
  }

  updateStyle() {
    this.elementRef.nativeElement.style.background = this.cS.style.contextMenuBackground;
  }


}
