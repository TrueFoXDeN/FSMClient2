import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input("options") options: any = []
  showDropDown = false;
  closing = false;
  selectedOption = "";

  constructor() {

  }


  onItemClick(value: string) {
    this.selectedOption = value;
    this.closing = true;
    this.showDropDown = false;
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
}
