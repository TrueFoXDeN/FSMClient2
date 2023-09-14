import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[profileSettings]'
})
export class ProfileSettingsDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  @Input("header") isHeader = false;

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSizes();
    }));
  }

  ngOnInit(): void {
    this.updateSizes();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSizes() {
    if (this.isHeader) {
      this.elementRef.nativeElement.style.fontSize = `${20 * this.styleChanger.multiplier}pt`;
    }else{
      this.elementRef.nativeElement.style.fontSize = `${12 * this.styleChanger.multiplier}pt`;
    }
  }


}
