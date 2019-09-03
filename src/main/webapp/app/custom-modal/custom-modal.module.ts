import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomModalComponent } from 'app/custom-modal/custom-modal.component';

@NgModule({
  imports: [MatDialogModule],
  declarations: [CustomModalComponent],
  entryComponents: [CustomModalComponent],
  schemas: []
})
export class FaceadminModalModule {}
