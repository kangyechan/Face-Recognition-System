import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LiveService } from 'app/face/live/live.service';

@Component({
  selector: 'jhi-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.scss']
})
export class LiveComponent implements OnInit {
  @ViewChild('live', { static: true }) live: ElementRef;

  bAction: string;
  cameraState;
  serverText: string;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.bAction = 'OFF';
    this.cameraState = false;
    this.serverText = 'servertext';
  }

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
      this.liveService.listen().subscribe(() => {
        console.log('image get reque가 일어나고 있음');
      });
    }
    // this.serverText = this.getServerText();
  }

  // getServerText(): string {
  //
  //   return require('http://localhost:8080/api/camera/live');
  //
}
