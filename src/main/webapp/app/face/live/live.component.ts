import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  bAction: string;

  constructor() {}

  ngOnInit() {
    this.bAction = 'OFF';
  }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.bAction = 'ON';
    } else {
      this.bAction = 'OFF';
    }
  }
}
