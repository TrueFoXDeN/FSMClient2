import {Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../../customStyles";
import {StyleChangerService} from "../../../services/style-changer.service";
import {FlightstripService} from "../../../flightstrip-container/flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[appProfileSaveButton]'
})
export class ProfileSettingsSaveButtonDirective implements OnInit, OnDestroy {
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
    this.updateSizes();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSizes() {

  }

  updateStyle() {
    this.elementRef.nativeElement.style.fontSize = `${12 * this.styleChanger.multiplier}pt`;
  }


}
