import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Data} from "../data";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnChanges, OnInit {
  @Input("options") options: any = []
  @Input("optionListLength") listLength: number = 0;
  @Output("onItemSelect") onItemSelect = new EventEmitter<{ value: string, name: string }>();
  showDropDown = false;
  closing = false;
  selectedOption: any = {};

  constructor(private globalData: Data) {

  }

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
    let lastOptionName = this.globalData.profileData[this.globalData.currentProfileID].name;
    let lastOptionID = this.globalData.currentProfileID;
    let _lastOption = {id: lastOptionID, name: lastOptionName};
    let index = -1;
    this.options.forEach((element: any, _index: number) => {
      if (element.id == _lastOption.id && element.name == _lastOption.name) {
        index = _index
      }
    });
    this.selectedOption = this.options[index];
    this.onItemSelect.emit(this.selectedOption)
  }


}
