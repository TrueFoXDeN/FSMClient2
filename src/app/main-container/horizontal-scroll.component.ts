import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit {
  idTracker = 0;

  getId() {
    this.idTracker += 1;
    return this.idTracker;
  }

  ngOnInit(): void {
    console.log(environment.appVersion)
  }
}
