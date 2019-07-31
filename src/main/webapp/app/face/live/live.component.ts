import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  cameraText: string;
  doorText: string;
  cameraState;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.cameraText = 'OFF';
    this.doorText = 'OPEN';
    this.cameraState = true;
    // this.liveService.listen().subscribe(response => {
    //   console.log('testing');
    // });
  }

  toggleCamera() {
    if (this.cameraState) {
      this.cameraText = 'ON';
      this.cameraState = false;
    } else {
      this.cameraText = 'OFF';
      this.cameraState = true;
    }
  }

  toggleDoor() {
    this.liveService.doorOpen('ON').subscribe(data => {
      console.log('Door open');
    });
  }

  get captureURL() {
    return this.liveService.getCaptureURL();
  }
}
