import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-button-png',
  templateUrl: './sidebar-button-png.component.html',
  styleUrls: ['./sidebar-button-png.component.scss']
})
export class SidebarButtonPngComponent {
  @Input() text = ''
  @Input() icon = ''
}
