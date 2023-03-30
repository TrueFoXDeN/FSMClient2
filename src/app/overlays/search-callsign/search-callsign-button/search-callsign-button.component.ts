import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-search-callsign-button',
  templateUrl: './search-callsign-button.component.html',
  styleUrls: ['./search-callsign-button.component.scss']
})
export class SearchCallsignButtonComponent {
  @Input() text = ''
  @Input() icon = ''

  constructor() { }

  ngOnInit(): void {
  }

}
