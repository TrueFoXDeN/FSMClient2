import {Directive, ElementRef, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {Flightstrip, stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";

@Directive({
  selector: '[flightStripCompact]'
})
export class FlightStripCompact implements OnInit, OnDestroy {
  @Input("fsCompact") fs!: Flightstrip
  @Input("flightStripFontSize") fontSize: string = "medium"

  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateStyle()
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
    switch (this.fontSize) {
      case "small":
        this.elementRef.nativeElement.style.fontSize = `${7 * this.cS.multiplier}pt`
        break;
      case "medium":
        this.elementRef.nativeElement.style.fontSize = `${11 * this.cS.multiplier}pt`
        break;
      case "large":
        this.elementRef.nativeElement.style.fontSize = `${18 * this.cS.multiplier}pt`
        break;
    }
  }


}
