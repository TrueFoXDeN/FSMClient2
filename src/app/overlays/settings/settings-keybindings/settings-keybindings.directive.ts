import {Directive, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {CustomStyles} from "../../../customStyles";
import {StyleChangerService} from "../../../services/style-changer.service";

@Directive({
  selector: '[appSettingsKeybindings]',
  standalone: true
})
export class SettingsKeybindingsDirective implements OnInit, OnDestroy {
  subscriptionList: any = []

  constructor(private elementRef: ElementRef, private styleChanger: StyleChangerService) {
    this.subscriptionList.push(this.styleChanger.changedSize.subscribe(() => {
      this.updateSize();
    }));

  }

  ngOnInit(): void {
    this.updateSize();
  }

  ngOnDestroy() {
    this.subscriptionList.forEach((sub: any) => {
      sub.unsubscribe();
    });
  }

  updateSize() {
    this.elementRef.nativeElement.style.fontSize = `${12 * this.styleChanger.multiplier}pt`
  }


}
