import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: 'Title';
  contents: 'Contents';
}

@Component({
  selector: 'jhi-custom-confirm-modal',
  templateUrl: './custom-confirm-modal.component.html',
  styleUrls: ['./custom-confirm-modal.scss']
})
export class CustomComfirmModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
