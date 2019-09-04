import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomModalComponent } from 'app/custom-modal/custom-modal.component';
import { CustomComfirmModalComponent } from 'app/custom-modal/custom-comfirm-modal.component';

@NgModule({
  imports: [MatDialogModule],
  declarations: [CustomModalComponent, CustomComfirmModalComponent],
  entryComponents: [CustomModalComponent, CustomComfirmModalComponent],
  schemas: []
})
export class FaceadminModalModule {}
