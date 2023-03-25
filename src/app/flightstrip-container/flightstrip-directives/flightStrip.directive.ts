import {Directive, ElementRef, Input, OnInit} from "@angular/core";
import {CustomStyles} from "../../customStyles";
import {Flightstrip, stripType} from "../flightstrip.model";
import {StyleChangerService} from "../../services/style-changer.service";
import {FlightstripService} from "../flightstrip.service";
import {Subject} from "rxjs";

@Directive({
  selector: '[flightStrip]'
})
export class FlightStripContainer implements OnInit {
  @Input("flightStrip") fs!: Flightstrip
  squawk: string = ""

  constructor(private elementRef: ElementRef, private cS: CustomStyles, private styleChanger: StyleChangerService, private fsService: FlightstripService) {
    this.styleChanger.changedColors.subscribe(() => {
      this.updateStyle();
    });
    this.fsService.changedType.subscribe((data) => {
      if (data.id == this.fs.id) {
        this.fs.type = data.type;
        this.updateStyle();
      }
    })
  }

  onSquawkChange(squawk: string) {
    this.squawk = squawk;
    this.updateStyle();
  }

  ngOnInit(): void {
    this.updateStyle();
  }

  updateStyle() {
    //console.log(this.type);
    this.elementRef.nativeElement.style.borderWidth = "2px";
    this.elementRef.nativeElement.style.borderStyle = "solid";
    console.log(`Type in Dir: ${this.fs.type}`)
    switch (this.fs.type) {
      case stripType.INBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundInbound;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorInbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorInbound;
        break;
      case stripType.OUTBOUND:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundOutbound;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorOutbound;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorOutbound;
        break;
      case stripType.VFR:
        this.elementRef.nativeElement.style.background = this.cS.style.fsBackgroundVfr;
        this.elementRef.nativeElement.style.borderColor = this.cS.style.fsBorderColorVfr;
        this.elementRef.nativeElement.style.color = this.cS.style.fsTextColorVfr;
        break;
    }
    if (this.squawk == "7500" || this.squawk == "7600" || this.squawk == "7700") {
      this.elementRef.nativeElement.style.borderColor = this.cS.style.fsEmergencyBorderColor;
    }
  }

  markForDeleteOperation() {
    this.elementRef.nativeElement.style.borderColor = this.cS.style.fsDelete
  }


}
