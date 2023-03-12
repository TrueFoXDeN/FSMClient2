import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Flightstrip } from './flightstrip.model';
@Component({
  selector: 'app-flightstrip',
  templateUrl: './flightstrip.component.html',
  styleUrls: ['../../app-theme.scss', './flightstrip.component.scss']
})
export class FlightstripComponent implements OnInit, AfterViewInit {

  @Input() fs!: Flightstrip;

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }



}
