import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  bAction: string;
  cameraState;
  serverText: string;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
    this.cameraState = false;
    this.serverText = 'serverTEst';
  }

  toggleCamera() {
    if (this.bAction === 'OFF') {
      this.bAction = 'ON';
      this.cameraState = true;
      this.liveService.save('OFF').subscribe(data => {
        console.log('OFF 버튼 클릭, 구독 중지');
        // this.subscribeImage.unsubscribe();
      });
    } else {
      this.bAction = 'OFF';
      this.cameraState = false;
      this.liveService.save('ON').subscribe(data => {
        console.log('ON 버튼 클릭, 구독 시작');
      });
    }
  }

  toggleDoor() {
    this.liveService.listen().subscribe(response => {
      console.log('image get request가 일어나고 있음');
      this.serverText = response;
      console.log(this.serverText);
    });
  }

  get captureURL() {
    // return 'http://localhost:5000/capture/stream';
    return 'http://localhost:8080/api/camera/live';
  }
}
