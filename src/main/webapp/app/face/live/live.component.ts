import { Component, OnInit } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  bAction: string;
  cameraState;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
    this.cameraState = false;
  }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.liveService.save('off').subscribe(data => {
        this.bAction = 'ON';
        this.cameraState = true;
      });
    } else {
      this.liveService.save('on').subscribe(data => {
        this.bAction = 'OFF';
        this.cameraState = false;
      });
    }
  }
}
