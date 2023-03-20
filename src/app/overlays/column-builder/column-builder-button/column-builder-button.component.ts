import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-column-builder-button',
  templateUrl: './column-builder-button.component.html',
  styleUrls: ['./column-builder-button.component.scss']
})
export class ColumnBuilderButtonComponent {
  @Input() text = ''
  @Input() icon = ''

  constructor() { }

  ngOnInit(): void {
  }

}
