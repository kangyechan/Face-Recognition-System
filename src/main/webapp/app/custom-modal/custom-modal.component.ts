import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: 'Title';
  contents: 'Contents';
}

@Component({
  selector: 'jhi-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.scss']
})
export class CustomModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
