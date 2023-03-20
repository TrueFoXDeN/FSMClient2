import { Directive, Input, ElementRef, EventEmitter, OnDestroy } from "@angular/core";
import { Subscription } from 'rxjs';

@Directive({
  selector: "[blurOn]"
})
export class BlurOnDirective implements OnDestroy {

  private _attachedEvent: EventEmitter<void> | null = null;
  private _eventSubscription: Subscription | null = null;

  public constructor(private readonly _element: ElementRef) {
  }

  public ngOnDestroy(): void {
    if (this._eventSubscription)
      this._eventSubscription.unsubscribe();
  }

  @Input("blurOn")
  public set attachedEvent(value: EventEmitter<void> | null) {
    if (this._attachedEvent === value)
      return;

    if (this._eventSubscription)
      this._eventSubscription.unsubscribe();
    this._attachedEvent = value;
    if (value)
      this._eventSubscription = value.subscribe(() => this.onEvent());
  }

  private onEvent(): void {
    const nativeElement: any = this._element.nativeElement;
    if (typeof(nativeElement.blur) === "function")
      nativeElement.blur();
  }

}
