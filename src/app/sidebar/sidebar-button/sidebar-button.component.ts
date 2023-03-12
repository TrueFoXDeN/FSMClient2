import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent {
  @Input() text = ''
  @Input() icon = ''

  constructor() { }

  ngOnInit(): void {
  }

}
