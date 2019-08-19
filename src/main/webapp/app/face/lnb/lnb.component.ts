import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LnbService } from './lnb.service';

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

  constructor(private modalService: NgbModal, private lnbService: LnbService) {}

  ngOnInit() {}

  preWork() {
    console.log('전처리 테스트');
    this.lnbService.makeAligndata().subscribe(data => {
      console.log(data);
    });
  }

  learning() {
    console.log('학습 테스트');
    this.lnbService.makeClassifier().subscribe(data => {
      console.log(data);
    });
  }

  lnbToggle() {
    this.buttonState = !this.buttonState;
  }
}
