import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-general-dropdown',
  templateUrl: './general-dropdown.component.html',
  styleUrls: ['./general-dropdown.component.scss']
})
export class GeneralDropdownComponent implements OnChanges, OnInit {
  @Input("options") options: any = []
  @Input("optionListLength") listLength: number = 0;
  @Output("onItemSelect") onItemSelect = new EventEmitter<{ value: string, name: string }>();
  showDropDown = false;
  closing = false;
  selectedOption: any = {};

  onItemClick(option: any) {
    this.selectedOption = option
    this.closing = true;
    this.showDropDown = false;
    this.onItemSelect.emit(option)
  }

  onIconClick() {
    if (this.showDropDown) {
      this.closing = true;
      this.showDropDown = false;
    } else {
      this.closing = false;
      this.showDropDown = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listLength'].currentValue > changes['listLength'].previousValue) {
      this.selectedOption = this.options[this.options.length - 1];
    } else if (changes['listLength'].currentValue < changes['listLength'].previousValue) {
      this.onItemClick(this.options[0]);
    }
  }

  ngOnInit(): void {
    if (this.options.length > 0) {
      this.selectedOption = this.options[0]
      this.onItemSelect.emit(this.selectedOption)
    }
  }
}
