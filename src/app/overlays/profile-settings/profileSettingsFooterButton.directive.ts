import {Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../../flightstrip-container/flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[appProfileFooterButton]'
})
export class ProfileSettingsFooterButtonDirective implements OnInit, OnDestroy {
  subscriptionList: any = []
  @Input("appProfileFooterButton") buttonType = "standard"
  @Input("buttonActive") buttonActive = true;

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
    if (this.buttonType == "standard") {
      this.elementRef.nativeElement.style.background = this.cS.style.button;
      this.elementRef.nativeElement.style.outlineColor = this.cS.style.buttonOutline;
    } else if (this.buttonType == "warning") {
      this.elementRef.nativeElement.style.background = this.cS.style.buttonWarning;
      this.elementRef.nativeElement.style.outlineColor = this.cS.style.buttonWarningOutline;
    } else if (this.buttonType == "error") {
      this.elementRef.nativeElement.style.background = this.cS.style.buttonWarning;
      this.elementRef.nativeElement.style.outlineColor = this.cS.style.buttonWarningOutline;
    } else if (this.buttonType == "error-outline") {
      this.elementRef.nativeElement.style.background = 'transparent';
      this.elementRef.nativeElement.style.border = `2px solid ${this.cS.style.buttonErrorBorder}`;
    } else if (this.buttonType == "accent") {
      this.elementRef.nativeElement.style.background = this.cS.style.buttonAccent;
      this.elementRef.nativeElement.style.outlineColor = this.cS.style.buttonAccentOutline;
    }
    this.elementRef.nativeElement.style.fontSize = `${12 * this.cS.multiplier}pt`;
    this.elementRef.nativeElement.style.fontColor = this.cS.style.fontColor

  }

  @HostListener("mouseenter") onMouseEnter() {
    if (this.buttonActive) {
      switch (this.buttonType) {
        case "error-outline":
          this.elementRef.nativeElement.style.background = this.cS.style.buttonError;
      }
    }

  }

  @HostListener("mouseleave") onMouseLeave() {
    this.updateStyle();
  }


}
