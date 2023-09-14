import {Directive, ElementRef, HostListener, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[fsContextMenuItem]'
})
export class FsContextMenuItemDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    }));
  }

  ngOnInit(): void {
    this.updateSizes()
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  updateSizes() {
    this.elementRef.nativeElement.style.width = `100%`;
    // this.elementRef.nativeElement.style.fontSize = `${10 * this.styleChanger.multiplier}pt`;
    // this.elementRef.nativeElement.style.lineHeight = `${36 * this.styleChanger.multiplier}px`;

  }
}
