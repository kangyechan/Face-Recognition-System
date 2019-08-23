import { Component, OnInit } from '@angular/core';
import { PictureService } from './picture.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.scss']
})
export class PictureComponent implements OnInit {
  allType: boolean;

  detectList: Array<any> = [];
  detectSourceList: Array<any> = [];
  initSecond: number;
  sameTime: number;
  nameList: Array<any>;
  checkList: Array<any>;

  constructor(private pictureService: PictureService) {}

  ngOnInit() {
    this.nameList = ['exntu', 'magenta', 'whitelist', 'blacklist', 'unknown'];
    this.checkList = [true, true, true, true, true];
    this.initSecond = 1000;
    this.sameTime = 0;
    this.detectList = [];
    this.detectSourceList = [];
    interval(this.initSecond)
      .pipe(
        startWith(0),
        switchMap(() => this.pictureService.getDetectList())
      )
      .subscribe(infoList => {
        if (infoList.length !== 0) {
          if (this.detectList.toString() !== infoList.toString()) {
            this.sameTime = 0;
            this.initSecond = 1000;
            this.detectList = infoList;
            this.detectSourceList = [];
            infoList.forEach(info => {
              this.pictureService.getDetectImage(info, this.nameList, this.checkList).subscribe(infoData => {
                this.detectSourceList.push(infoData);
              });
            });
          } else {
            this.sameTime++;
            if (this.sameTime > 1800) {
              this.initSecond = 100000;
            }
          }
        }
      });
  }
}
