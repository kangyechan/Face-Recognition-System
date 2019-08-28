import { Component, OnInit, ViewChild } from '@angular/core';
import { DetectCaptureComponent } from './detect-capture/detect-capture.component';

@Component({
  selector: 'jhi-detect',
  templateUrl: './detect.component.html',
  styleUrls: ['./detect.scss']
})
export class DetectComponent implements OnInit {
  @ViewChild(DetectCaptureComponent, { static: false }) private detectCapture: DetectCaptureComponent;

  allCheckbox = true;
  member1Checkbox = true;
  member2Checkbox = true;
  whiteCheckbox = true;
  blackCheckbox = true;
  unknownCheckbox = true;

  all: string;
  member1: string;
  member2: string;
  whiteList: string;
  blackList: string;
  unKnown: string;

  constructor() {
    this.all = 'all';
    this.member1 = 'exntu';
    this.member2 = 'magenta';
    this.whiteList = 'whitelist';
    this.blackList = 'blacklist';
    this.unKnown = 'unknown';
  }

  ngOnInit() {
    this.member1Checkbox = true;
    this.member2Checkbox = true;
    this.whiteCheckbox = true;
    this.blackCheckbox = true;
    this.unknownCheckbox = true;
  }

  checkAll() {
    if (this.allCheckbox) {
      this.member1Checkbox = true;
      this.member2Checkbox = true;
      this.whiteCheckbox = true;
      this.blackCheckbox = true;
      this.unknownCheckbox = true;
      this.detectCapture.allType = true;
      this.detectCapture.detectSourceList.forEach(detectSource => {
        detectSource.show = true;
      });
    } else {
      this.member1Checkbox = false;
      this.member2Checkbox = false;
      this.whiteCheckbox = false;
      this.blackCheckbox = false;
      this.unknownCheckbox = false;
      this.detectCapture.allType = false;
      this.detectCapture.detectSourceList.forEach(detectSource => {
        detectSource.show = false;
      });
    }
    this.detectCapture.checkList = [
      this.member1Checkbox,
      this.member2Checkbox,
      this.whiteCheckbox,
      this.blackCheckbox,
      this.unknownCheckbox
    ];
  }

  checkState(checkMember: string, checkBool: boolean) {
    if (checkBool) {
      this.detectCapture.detectSourceList.forEach(detectSource => {
        if (detectSource.type.toLowerCase() === checkMember.toLowerCase()) {
          detectSource.show = true;
        }
      });
    } else {
      this.detectCapture.detectSourceList.forEach(detectSource => {
        if (detectSource.type.toLowerCase() === checkMember.toLowerCase()) {
          detectSource.show = false;
        }
      });
      this.allCheckbox = false;
      this.detectCapture.allType = false;
    }
    this.detectCapture.checkList = [
      this.member1Checkbox,
      this.member2Checkbox,
      this.whiteCheckbox,
      this.blackCheckbox,
      this.unknownCheckbox
    ];
  }
}
