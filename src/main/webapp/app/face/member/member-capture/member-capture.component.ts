import { Component, OnInit } from '@angular/core';
import { MemberCaptureService } from 'app/face/member/member-capture/member-capture.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-member-capture',
  templateUrl: './member-capture.component.html',
  styleUrls: ['./member-capture.scss']
})
export class MemberCaptureComponent implements OnInit {
  matchList = [];
  matchSourceList = [];
  initSecond = 1000;
  sameTime = 0;

  constructor(private memberCaptureService: MemberCaptureService) {}

  ngOnInit() {
    interval(this.initSecond)
      .pipe(
        startWith(0),
        switchMap(() => this.memberCaptureService.getMatchList())
      )
      .subscribe(nameList => {
        if (nameList.length !== 0) {
          if (this.matchList.toString() !== nameList.toString()) {
            this.sameTime = 0;
            this.initSecond = 1000;
            this.matchList = nameList;
            this.matchSourceList = [];
            nameList.forEach(name => {
              this.memberCaptureService.getOriginImage(name).subscribe(originData => {
                this.matchSourceList.push(originData);
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
