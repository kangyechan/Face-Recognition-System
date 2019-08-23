import { Component, OnInit } from '@angular/core';
import { MatchService } from './match.service';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.scss']
})
export class MatchComponent implements OnInit {
  matchList: Array<any> = [];
  matchSourceList: Array<any> = [];
  initSecond: number;
  sameTime: number;

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.initSecond = 1000;
    this.sameTime = 0;
    this.matchList = [];
    this.matchSourceList = [];
    interval(this.initSecond)
      .pipe(
        startWith(0),
        switchMap(() => this.matchService.getMatchList())
      )
      .subscribe(nameList => {
        if (nameList.length !== 0) {
          if (this.matchList.toString() !== nameList.toString()) {
            this.sameTime = 0;
            this.initSecond = 1000;
            this.matchList = nameList;
            this.matchSourceList = [];
            nameList.forEach(name => {
              this.matchService.getOriginImage(name).subscribe(originData => {
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
