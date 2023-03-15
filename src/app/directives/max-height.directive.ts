import {Directive, ElementRef, Input, OnInit} from "@angular/core";

@Directive({
  selector: '[appMaxHeight]'
})
export class MaxHeightDirective implements OnInit {
  @Input() maxHeight = 0;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.maxHeight = this.maxHeight
  }

}
