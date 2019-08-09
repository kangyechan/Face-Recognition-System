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
  sectionState: string;
  sectionTitle: string;
  cameraState: boolean;
  imageSection: boolean;
  liveSection: boolean;

  constructor(private liveService: LiveService) {}

  ngOnInit() {
    this.cameraText = 'OFF';
    this.doorText = 'OPEN';
    this.sectionState = 'IMAGE';
    this.sectionTitle = 'Live On';
    this.cameraState = true;
    this.imageSection = false;
    this.liveSection = true;
  }

  toggleSection() {
    if (this.liveSection) {
      this.cameraText = 'ON';
      this.liveSection = false;
    } else {
      this.cameraText = 'OFF';
      this.liveSection = true;
    }
  }

  toggleDoor() {
    this.liveService.doorOpen('ON').subscribe(data => {
      console.log('Door open');
    });
  }

  toggleState() {
    if (this.sectionState === 'IMAGE') {
      this.cameraState = false;
      this.imageSection = true;
      this.sectionState = 'LIVE';
      this.sectionTitle = 'Folder Contents';
    } else {
      this.cameraState = true;
      this.imageSection = false;
      this.sectionState = 'IMAGE';
      this.sectionTitle = 'Live On';
    }
  }

  getCapture() {
    this.liveService.listen().subscribe(data => {
      console.log(data);
    });
  }

  get captureURL() {
    console.log('reset');
    return this.liveService.getCaptureURL();
  }
}
