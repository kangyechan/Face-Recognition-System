import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-modal-prework',
  templateUrl: './prework.component.html',
  styleUrls: ['./modal.scss']
})
export class PreworkModalComponent {
  @Input() contents;

  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'jhi-modal-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./modal.scss']
})
export class LearningModalComponent {
  @Input() contents;

  constructor(public activeModal: NgbActiveModal) {}
}
