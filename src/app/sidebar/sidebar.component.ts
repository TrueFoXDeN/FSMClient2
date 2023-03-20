import {Component} from '@angular/core';
import {CustomStyles} from "../customStyles";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private customStyle: CustomStyles) {
  }

  onClick() {
  }
}
