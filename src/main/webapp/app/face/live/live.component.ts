import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';
import { WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit, DoCheck {
  @ViewChild('live', { static: true }) live: ElementRef;

  showWebcam: boolean;
  bAction: string;
  cameraState;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
    this.cameraState = false;
    this.showWebcam = true;
  }

  getLive(): string {
    return require('../../../../resources/images/live.jpg');
  }

  ngDoCheck() {
    console.log('REFRESH');
  }

  // public handleInitError(error: WebcamInitError): void {
  //   if (error.mediaStreamError && error.mediaStreamError.name === 'NotAllowedError') {
  //     console.warn('Camera access was not allowed by user!');
  //   }
  // }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.bAction = 'ON';
      this.cameraState = true;
      this.liveService.save('OFF').subscribe(data => {
        console.log(data);
      });
    } else {
      this.bAction = 'OFF';
      this.cameraState = false;
      this.liveService.save('ON').subscribe(data => {
        console.log(data);
      });
    }
  }

  // toggleCamera(): void {

  // this.showWebcam = !this.showWebcam;
  // if (this.bAction === 'OFF') {
  //   this.bAction = 'ON';
  //   this.cameraState = true;
  // } else {
  //   this.bAction = 'OFF';
  //   this.cameraState = false;
  // }
  // }
}
