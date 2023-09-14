import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {Flightstrip, stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";

@Directive({
  selector: '[flightStripInput]'
})
export class FlightStripInput implements OnInit, OnDestroy {

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateStyle();
    }));
  }

  ngOnInit(): void {
    this.updateStyle();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }


  updateStyle() {
    this.elementRef.nativeElement.style.fontSize = `${10 * this.styleChanger.multiplier}pt`
  }


}
