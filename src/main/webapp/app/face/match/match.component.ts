import { Component, OnInit } from '@angular/core';
import { MatchService } from 'app/face/match/match.service';
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

  constructor(private matchService: MatchService) {}

  ngOnInit() {
    this.matchList = [];
    this.matchSourceList = [];
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.matchService.getMatchList())
      )
      .subscribe(nameList => {
        console.log(this.matchSourceList.length);
        if (nameList.length !== 0) {
          if (this.matchList.toString() !== nameList.toString()) {
            this.matchList = nameList;
            this.matchSourceList = [];
            nameList.forEach(name => {
              this.matchService.getOriginImage(name).subscribe(originData => {
                this.matchSourceList.push(originData);
              });
            });
          }
        }
      });
  }
}
