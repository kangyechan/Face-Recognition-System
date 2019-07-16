import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-ngbd-modal-prework',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">전처리 선택</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>이 창은 {{ name }}!!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ModalPreworkComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'jhi-ngbd-modal-learning',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">학습 선택창</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>이 창은 {{ name }}!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ModalLeaningComponent {
  @Input() name;

  constructor(public activeModal: NgbActiveModal) {}
}

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
          left: '-13vh'
        })
      ),
      transition('in => out', [animate('0.5s')]),
      transition('out => in', [animate('0.5s')])
    ])
  ]
})
export class LnbComponent implements OnInit {
  buttonState = false;
  buttonArrow = '>';

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  prework() {
    console.log('전처리 테스트');
    const modalRef = this.modalService.open(ModalPreworkComponent);
    modalRef.componentInstance.name = '전처리 창입니다.';
  }

  learning() {
    console.log('학습 테스트');
    const modalRef = this.modalService.open(ModalLeaningComponent);
    modalRef.componentInstance.name = '학습 창입니다.';
  }

  lnbToggle() {
    this.buttonState = !this.buttonState;

    if (this.buttonState) {
      this.buttonArrow = '<';
    } else {
      this.buttonArrow = '>';
    }
  }
}
