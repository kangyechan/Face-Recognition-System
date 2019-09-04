import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith, switchMap, take } from 'rxjs/operators';
import { DetectCaptureService } from 'app/face/detect/detect-capture/detect-capture.service';

@Component({
  selector: 'jhi-detect-capture',
  templateUrl: './detect-capture.component.html',
  styleUrls: ['./detect-capture.scss']
})
export class DetectCaptureComponent implements OnInit {
  allType = true;
  detectList = [];
  detectSourceList = [];
  initSecond = 1000;
  sameTime = 0;
  nameList = ['exntu', 'magenta', 'whitelist', 'blacklist', 'unknown'];
  checkList = [true, true, true, true, true];

  constructor(private detectCaptureService: DetectCaptureService) {}

  ngOnInit() {
    interval(this.initSecond)
      .pipe(
        startWith(0),
        switchMap(() => this.detectCaptureService.getDetectList())
      )
      .subscribe(infoList => {
        if (infoList.length !== 0) {
          if (this.detectList.toString() !== infoList.toString()) {
            this.sameTime = 0;
            this.initSecond = 1000;
            this.detectList = infoList;
            this.detectSourceList = [];
            infoList.forEach(info => {
              this.detectCaptureService.getDetectImage(info, this.nameList, this.checkList).subscribe(infoData => {
                this.detectSourceList.push(infoData);
              });
            });
          } else {
            this.sameTime++;
            if (this.sameTime > 1800) {
              this.initSecond = 10000;
            }
          }
        }
      });
  }
}
