import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-button',
  templateUrl: './column-button.component.html',
  styleUrls: ['./column-button.component.scss']
})
export class ColumnButtonsComponent {
  @Input() text = ''
  @Input() icon = ''
}
