import { NgModule } from '@angular/core';

import { FaceadminSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [FaceadminSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [FaceadminSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class FaceadminSharedCommonModule {}
