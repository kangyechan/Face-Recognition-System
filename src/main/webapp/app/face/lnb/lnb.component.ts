import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LnbService } from './lnb.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomModalComponent } from 'app/custom-modal/custom-modal.component';

@Component({
  selector: 'jhi-lnb',
  templateUrl: './lnb.component.html',
  styleUrls: ['./lnb.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          left: '-18px'
        })
      ),
      state(
        'out',
        style({
          left: '-130px'
        })
      ),
      transition('in => out', [animate('0.5s')]),
      transition('out => in', [animate('0.5s')])
    ]),

    trigger('buttonRotation', [
      state(
        'in',
        style({
          transform: 'rotate( 180deg )'
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate( 0deg )'
        })
      )
    ])
  ]
})
export class LnbComponent {
  buttonState = false;

  constructor(private modalService: NgbModal, private lnbService: LnbService, public dialog: MatDialog) {}

  preProcessing() {
    this.alertSet('Working', '전처리 작업 중입니다.\n 잠시만 기다려 주세요...');
    this.lnbService.preProcessing().subscribe(data => {
      console.log(data);
      this.alertSet('Complete', '전처리 작업이 완료되었습니다.');
    });
    this.buttonState = false;
  }

  learning() {
    this.alertSet('Working', '학습 중 입니다.\n 잠시만 기다려 주세요...');
    this.lnbService.learning().subscribe(data => {
      console.log(data);
      this.alertSet('Complete', '학습이 완료되었습니다.\n 얼굴인식을 재 실행 합니다.');
      this.lnbService.reStart().subscribe();
    });
    this.buttonState = false;
  }

  lnbToggle() {
    this.buttonState = !this.buttonState;
  }

  alertSet(alertTitle: string, alertContents: string) {
    this.dialog.open(CustomModalComponent, {
      data: {
        title: alertTitle,
        contents: alertContents
      }
    });
  }
}
