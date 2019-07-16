import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LearningModalComponent, PreworkModalComponent } from 'app/face/modal/modal.component';

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
          transform: 'rotate( 0deg )'
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate( 180deg )'
        })
      )
    ])
  ]
})
export class LnbComponent implements OnInit {
  buttonState = false;
  // buttonArrow = '>';

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  prework() {
    console.log('전처리 테스트');
    const modalRef = this.modalService.open(PreworkModalComponent);
    modalRef.componentInstance.contents = '전처리 창입니다.';
  }

  learning() {
    console.log('학습 테스트');
    const modalRef = this.modalService.open(LearningModalComponent);
    modalRef.componentInstance.contents = '학습 창입니다.';
  }

  lnbToggle() {
    this.buttonState = !this.buttonState;

    // if (this.buttonState) {
    //   this.buttonArrow = '<';
    // } else {
    //   this.buttonArrow = '>';
    // }
  }
}
