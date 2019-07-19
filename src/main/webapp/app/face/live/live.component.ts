import { Component, OnInit } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  bAction: string;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
  }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.bAction = 'ON';
      this.liveService.save(true);
    } else {
      this.bAction = 'OFF';
      this.liveService.save(false);
    }
  }
}
